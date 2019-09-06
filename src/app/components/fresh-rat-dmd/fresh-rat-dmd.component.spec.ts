import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreshRatDmdComponent } from './fresh-rat-dmd.component';

describe('FreshRatDmdComponent', () => {
  let component: FreshRatDmdComponent;
  let fixture: ComponentFixture<FreshRatDmdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreshRatDmdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreshRatDmdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
