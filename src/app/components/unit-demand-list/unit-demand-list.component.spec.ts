import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitDemandListComponent } from './unit-demand-list.component';

describe('UnitDemandListComponent', () => {
  let component: UnitDemandListComponent;
  let fixture: ComponentFixture<UnitDemandListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitDemandListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitDemandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
