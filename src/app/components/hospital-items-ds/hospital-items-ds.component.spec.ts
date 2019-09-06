import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalItemsDsComponent } from './hospital-items-ds.component';

describe('HospitalItemsDsComponent', () => {
  let component: HospitalItemsDsComponent;
  let fixture: ComponentFixture<HospitalItemsDsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalItemsDsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalItemsDsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
