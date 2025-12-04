import { Component, OnInit, EventEmitter, Output, AfterViewInit, Inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactsService } from '../../service/contacts';
import { Contact } from '../../models/contact.model';
import { ContactItem } from '../contact-item/contact-item';
import { Renderer2 } from '@angular/core';
import { LoadingWrapper } from '../../directives/loading-wrapper';

@Component({
  selector: 'app-contact-list',
  imports: [CommonModule, FormsModule, ContactItem, LoadingWrapper],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css',
})
export class ContactListComponent implements OnInit, AfterViewInit {
  contacts: Contact[] = [];
  searchTerm = '';
  limit = 10;
  skip = 0;
  loading = false;
  end = false;

  @Output() select = new EventEmitter<Contact>();
  @Output() edit = new EventEmitter<Contact>();
  @Output() loaded = new EventEmitter<void>();
  @Output() delete = new EventEmitter<Contact>();

  @ViewChild('contactList', { static: false }) contactListRef!: ElementRef;

  constructor(
    private contactService: ContactsService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  ngAfterViewInit(): void {
 
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      const listEl = this.contactListRef?.nativeElement;
      if (listEl) {
        this.renderer.listen(listEl, 'scroll', () => {
          if (listEl.scrollTop + listEl.clientHeight >= listEl.scrollHeight - 10) {
            this.loadContacts();
          }
        });
      }
    });
  }

  loadContacts() {
    if (this.loading || this.end) return;
    this.loading = true;

    this.contactService.getAll(this.limit, this.skip).subscribe((res) => {
      if (res.length < this.limit) this.end = true;

      this.contacts.push(...res);
      this.skip += this.limit;
      this.loading = false;
      this.loaded.emit();
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

  onEdit(contact: Contact) {
    this.edit.emit(contact);
  }
}
