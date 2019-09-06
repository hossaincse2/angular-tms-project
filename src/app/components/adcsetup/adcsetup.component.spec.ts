import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ADCSetupComponent } from './adcsetup.component';

describe('ADCSetupComponent', () => {
  let component: ADCSetupComponent;
  let fixture: ComponentFixture<ADCSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ADCSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ADCSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
