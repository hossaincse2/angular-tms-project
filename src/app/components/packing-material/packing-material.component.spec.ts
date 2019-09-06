import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingMaterialComponent } from './packing-material.component';

describe('PackingMaterialComponent', () => {
  let component: PackingMaterialComponent;
  let fixture: ComponentFixture<PackingMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackingMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
