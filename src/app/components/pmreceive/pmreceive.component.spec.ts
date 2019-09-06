import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PMReceiveComponent } from './pmreceive.component';

describe('PMReceiveComponent', () => {
  let component: PMReceiveComponent;
  let fixture: ComponentFixture<PMReceiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PMReceiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PMReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
