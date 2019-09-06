import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolDmdComponent } from './pol-dmd.component';

describe('PolDmdComponent', () => {
  let component: PolDmdComponent;
  let fixture: ComponentFixture<PolDmdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolDmdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolDmdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
