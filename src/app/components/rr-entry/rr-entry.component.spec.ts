import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RrEntryComponent } from './rr-entry.component';

describe('RrEntryComponent', () => {
  let component: RrEntryComponent;
  let fixture: ComponentFixture<RrEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RrEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RrEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
