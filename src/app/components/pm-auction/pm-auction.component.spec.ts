import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmAuctionComponent } from './pm-auction.component';

describe('PmAuctionComponent', () => {
  let component: PmAuctionComponent;
  let fixture: ComponentFixture<PmAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
