import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsdStockPosnHeadComponent } from './ssd-stock-posn-head.component';

describe('SsdStockPosnHeadComponent', () => {
  let component: SsdStockPosnHeadComponent;
  let fixture: ComponentFixture<SsdStockPosnHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsdStockPosnHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsdStockPosnHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
