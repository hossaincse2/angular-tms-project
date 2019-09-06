import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolAllotmentComponent } from './pol-allotment.component';

describe('PolAllotmentComponent', () => {
  let component: PolAllotmentComponent;
  let fixture: ComponentFixture<PolAllotmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolAllotmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolAllotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
