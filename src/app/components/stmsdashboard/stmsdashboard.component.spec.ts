import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { STMSDashboardComponent } from './stmsdashboard.component';

describe('STMSDashboardComponent', () => {
  let component: STMSDashboardComponent;
  let fixture: ComponentFixture<STMSDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ STMSDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(STMSDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
