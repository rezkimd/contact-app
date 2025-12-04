import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from '../../components/contact-list/contact-list';
import { ChatArea } from '../../components/chat-area/chat-area';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contacts',
  imports: [
    CommonModule,
    ContactListComponent,
    ChatArea,
  ],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class Contacts {
  selectedContact: Contact | null = null;

  onSelect(contact: Contact) {
    this.selectedContact = contact;
  }
}
