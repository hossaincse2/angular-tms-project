import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalItemScaleComponent } from './hospital-item-scale.component';

describe('HospitalItemScaleComponent', () => {
  let component: HospitalItemScaleComponent;
  let fixture: ComponentFixture<HospitalItemScaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalItemScaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalItemScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
