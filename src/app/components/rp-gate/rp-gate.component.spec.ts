import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpGateComponent } from './rp-gate.component';

describe('RpGateComponent', () => {
  let component: RpGateComponent;
  let fixture: ComponentFixture<RpGateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpGateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpGateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
