import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactorComponent } from './contactor.component';

describe('ContactorComponent', () => {
  let component: ContactorComponent;
  let fixture: ComponentFixture<ContactorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
