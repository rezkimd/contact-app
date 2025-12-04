import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Contact } from '../../models/contact.model';
import { Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm {
  @Input() contact: Contact | null = null; 
  @Input() show = false; // untuk modal
  @Output() save = new EventEmitter<Partial<Contact>>();
  @Output() close = new EventEmitter<void>();

  temp: Partial<Contact> = {};

  ngOnChanges() {
    // copy data contact saat edit
    this.temp = this.contact
      ? { ...this.contact }
      : { name: '', phone: '', email: '' };
  }

  submitForm() {
    this.save.emit(this.temp);
  }
}
