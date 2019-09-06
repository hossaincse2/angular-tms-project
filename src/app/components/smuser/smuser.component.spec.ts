import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SMUserComponent } from './smuser.component';

describe('SMUserComponent', () => {
  let component: SMUserComponent;
  let fixture: ComponentFixture<SMUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SMUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SMUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
