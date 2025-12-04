import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-chat-area',
  imports: [CommonModule],
  templateUrl: './chat-area.html',
  styleUrl: './chat-area.css',
})
export class ChatArea {
  @Input() contact!: Contact | null;
}
