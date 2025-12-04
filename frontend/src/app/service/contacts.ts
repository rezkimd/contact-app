import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../models/contact.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/contacts';

  getAll(limit: number, skip: number): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.baseUrl}?limit=${limit}&skip=${skip}`);
  }

  getOne(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.baseUrl}/${id}`);
  }

  create(data: Partial<Contact>): Observable<Contact> {
    return this.http.post<Contact>(this.baseUrl, data);
  }

  update(id: string, data: Partial<Contact>): Observable<Contact> {
    return this.http.patch<Contact>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<Contact> {
    return this.http.delete<Contact>(`${this.baseUrl}/${id}`);
  }
}
export class Contacts {
  
}
