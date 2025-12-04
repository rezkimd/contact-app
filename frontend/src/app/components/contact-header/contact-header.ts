import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-header.html',
  styleUrl: './contact-header.css',
})
export class ContactHeader {
  searchTerm = '';
  @Output() search = new EventEmitter<string>();
}
