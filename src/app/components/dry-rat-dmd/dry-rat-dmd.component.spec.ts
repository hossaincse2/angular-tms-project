import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DryRatDmdComponent } from './dry-rat-dmd.component';

describe('DryRatDmdComponent', () => {
  let component: DryRatDmdComponent;
  let fixture: ComponentFixture<DryRatDmdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DryRatDmdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DryRatDmdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
