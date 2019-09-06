import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalItemsDmdComponent } from './hospital-items-dmd.component';

describe('HospitalItemsDmdComponent', () => {
  let component: HospitalItemsDmdComponent;
  let fixture: ComponentFixture<HospitalItemsDmdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalItemsDmdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalItemsDmdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
