import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactorBillComponent } from './contactor-bill.component';

describe('ContactorBillComponent', () => {
  let component: ContactorBillComponent;
  let fixture: ComponentFixture<ContactorBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactorBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactorBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
