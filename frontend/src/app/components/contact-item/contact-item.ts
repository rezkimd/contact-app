import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-item',
  imports: [],
  templateUrl: './contact-item.html',
  styleUrl: './contact-item.css',
})
export class ContactItem {
  @Input() contact!: Contact;
  @Input() selected = false;
  @Output() delete = new EventEmitter<Contact>();
  @Output() edit = new EventEmitter<Contact>();

  onDelete(contact: Contact) {
    this.delete.emit(contact);
  }

  onEdit(contact: Contact) {
    this.edit.emit(contact);
  }
}
