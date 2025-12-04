import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactsService } from '../../service/contacts';
import { Contact } from '../../models/contact.model';
import { ContactItem } from '../contact-item/contact-item';

@Component({
  selector: 'app-contact-list',
  imports: [CommonModule, FormsModule, ContactItem],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css',
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  searchTerm = '';
  limit = 20;
  skip = 0;
  loading = false;
  end = false;

  @Output() selectContact = new EventEmitter<Contact>();

  constructor(private contactService: ContactsService) {}

  ngOnInit(): void {
    this.loadContacts();

    // infinite scroll listener
    setTimeout(() => {
      const list = document.querySelector('.contacts-list');
      if (list) {
        list.addEventListener('scroll', () => {
          if (list.scrollTop + list.clientHeight >= list.scrollHeight - 10) {
            this.loadContacts();
          }
        });
      }
    }, 200);
  }

  loadContacts() {
    if (this.loading || this.end) return;
    this.loading = true;

    this.contactService.getAll(this.limit, this.skip).subscribe((res) => {
      if (res.length < this.limit) this.end = true;

      this.contacts.push(...res);
      this.skip += this.limit;
      this.loading = false;
    });
  }

  search() {
    this.skip = 0;
    this.end = false;
    this.contacts = [];

    this.contactService.getAll(9999, 0).subscribe((res) => {
      this.contacts = res.filter((c) =>
        c.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }
}
