import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPopupComponent } from './contact-popup.component';

describe('ContactPopup', () => {
  let component: ContactPopupComponent;
  let fixture: ComponentFixture<ContactPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactPopupComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
