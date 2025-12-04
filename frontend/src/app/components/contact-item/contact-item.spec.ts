import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactItem } from './contact-item';

describe('ContactItem', () => {
  let component: ContactItem;
  let fixture: ComponentFixture<ContactItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactItem);
    component = fixture.componentInstance;

    component.contact = {
      _id: '1',
      name: 'Test User',
      phone: '+620000000',
      email: 'test@example.com',
      createdAt: '',
      updatedAt: ''
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
