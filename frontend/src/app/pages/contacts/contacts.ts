import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from '../../components/contact-list/contact-list';
import { ChatArea } from '../../components/chat-area/chat-area';
import { ContactForm } from '../../components/contact-form/contact-form';
import { Contact } from '../../models/contact.model';
import { ContactsService } from '../../service/contacts';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    ContactListComponent,
    ChatArea,
    ContactForm,
  ],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class Contacts {
  selectedContact: Contact | null = null;
  showForm = false;
  editingContact: Contact | null = null;

  @ViewChild(ContactListComponent) contactList!: ContactListComponent;

  constructor(private contactService: ContactsService) {}

  onSelect(contact: Contact) {
    this.selectedContact = contact;
  }

  openCreate() {
    this.editingContact = null;
    this.showForm = true;
  }

  openEdit(contact: Contact) {
    this.editingContact = contact;
    this.showForm = true;
  }

  onSave(contact: Partial<Contact>) {

     const payload = {
      name: contact.name,
      phone: contact.phone,
      email: contact.email
    };

    if (this.editingContact?._id) {
    this.contactService.update(this.editingContact._id, payload)
      .subscribe({
      next: (updated) => {
        const index = this.contactList.contacts.findIndex(
          (c) => c._id === updated._id
        );

        if (index !== -1) {
          this.contactList.contacts[index] = updated;
        }

        this.showForm = false;
      },
      error: (err) => console.error("UPDATE ERROR:", err)
    });
  } else {
      this.contactService.create(contact)
        .subscribe(() => {
          this.showForm = false;
          this.contactList.loadContacts(); 
        });
    }
  }

  onDelete(contact: Contact) {
  if (!confirm(`Delete ${contact.name}?`)) return;

  this.contactService.delete(contact._id!).subscribe(() => {
    this.contactList.contacts = this.contactList.contacts.filter(
      (c) => c._id !== contact._id
    );
  });
}
}
