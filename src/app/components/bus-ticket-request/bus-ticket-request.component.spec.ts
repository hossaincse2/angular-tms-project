import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusTicketRequestComponent } from './bus-ticket-request.component';

describe('BusTicketRequestComponent', () => {
  let component: BusTicketRequestComponent;
  let fixture: ComponentFixture<BusTicketRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusTicketRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusTicketRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
