import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolManagementComponent } from './pol-management.component';

describe('PolManagementComponent', () => {
  let component: PolManagementComponent;
  let fixture: ComponentFixture<PolManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
