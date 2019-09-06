import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RrManagementComponent } from './rr-management.component';

describe('RrManagementComponent', () => {
  let component: RrManagementComponent;
  let fixture: ComponentFixture<RrManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RrManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RrManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
