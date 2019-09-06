import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RrPeopleEntryComponent } from './rr-people-entry.component';

describe('RrPeopleEntryComponent', () => {
  let component: RrPeopleEntryComponent;
  let fixture: ComponentFixture<RrPeopleEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RrPeopleEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RrPeopleEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
