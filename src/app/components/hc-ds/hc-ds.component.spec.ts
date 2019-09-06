import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HcDsComponent } from './hc-ds.component';

describe('HcDsComponent', () => {
  let component: HcDsComponent;
  let fixture: ComponentFixture<HcDsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HcDsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HcDsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
