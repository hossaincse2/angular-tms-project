import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PMStockComponent } from './pmstock.component';

describe('PMStockComponent', () => {
  let component: PMStockComponent;
  let fixture: ComponentFixture<PMStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PMStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PMStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
