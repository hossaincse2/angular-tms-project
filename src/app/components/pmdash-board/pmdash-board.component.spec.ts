import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PMDashBoardComponent } from './pmdash-board.component';

describe('PMDashBoardComponent', () => {
  let component: PMDashBoardComponent;
  let fixture: ComponentFixture<PMDashBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PMDashBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PMDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
