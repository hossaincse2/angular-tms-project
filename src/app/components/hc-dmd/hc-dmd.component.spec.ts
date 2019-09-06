import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HcDmdComponent } from './hc-dmd.component';

describe('HcDmdComponent', () => {
  let component: HcDmdComponent;
  let fixture: ComponentFixture<HcDmdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HcDmdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HcDmdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
