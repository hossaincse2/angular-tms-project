import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondimentDmdComponent } from './condiment-dmd.component';

describe('CondimentDmdComponent', () => {
  let component: CondimentDmdComponent;
  let fixture: ComponentFixture<CondimentDmdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondimentDmdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondimentDmdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
