import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondimentDsComponent } from './condiment-ds.component';

describe('CondimentDsComponent', () => {
  let component: CondimentDsComponent;
  let fixture: ComponentFixture<CondimentDsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondimentDsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondimentDsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
