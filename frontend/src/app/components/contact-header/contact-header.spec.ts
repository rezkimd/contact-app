import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactHeader } from './contact-header';

describe('ContactHeader', () => {
  let component: ContactHeader;
  let fixture: ComponentFixture<ContactHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
