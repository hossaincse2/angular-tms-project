import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitDemandComponent } from './unit-demand.component';

describe('UnitDemandComponent', () => {
  let component: UnitDemandComponent;
  let fixture: ComponentFixture<UnitDemandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitDemandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
