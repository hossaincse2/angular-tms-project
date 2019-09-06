import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButchryItemsDsComponent } from './butchry-items-ds.component';

describe('ButchryItemsDsComponent', () => {
  let component: ButchryItemsDsComponent;
  let fixture: ComponentFixture<ButchryItemsDsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButchryItemsDsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButchryItemsDsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
