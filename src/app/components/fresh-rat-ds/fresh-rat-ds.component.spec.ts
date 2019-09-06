import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreshRatDsComponent } from './fresh-rat-ds.component';

describe('FreshRatDsComponent', () => {
  let component: FreshRatDsComponent;
  let fixture: ComponentFixture<FreshRatDsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreshRatDsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreshRatDsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
