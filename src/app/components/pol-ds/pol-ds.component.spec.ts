import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolDsComponent } from './pol-ds.component';

describe('PolDsComponent', () => {
  let component: PolDsComponent;
  let fixture: ComponentFixture<PolDsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolDsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolDsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
