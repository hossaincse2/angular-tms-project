import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DryRatDsComponent } from './dry-rat-ds.component';

describe('DryRatDsComponent', () => {
  let component: DryRatDsComponent;
  let fixture: ComponentFixture<DryRatDsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DryRatDsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DryRatDsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
