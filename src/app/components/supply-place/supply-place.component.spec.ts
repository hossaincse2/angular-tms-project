import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyPlaceComponent } from './supply-place.component';

describe('SupplyPlaceComponent', () => {
  let component: SupplyPlaceComponent;
  let fixture: ComponentFixture<SupplyPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
