import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SMSUserListComponent } from './smsuser-list.component';

describe('SMSUserListComponent', () => {
  let component: SMSUserListComponent;
  let fixture: ComponentFixture<SMSUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SMSUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SMSUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
