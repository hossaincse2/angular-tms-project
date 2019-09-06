import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolReceiveComponent } from './pol-receive.component';

describe('PolReceiveComponent', () => {
  let component: PolReceiveComponent;
  let fixture: ComponentFixture<PolReceiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolReceiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
