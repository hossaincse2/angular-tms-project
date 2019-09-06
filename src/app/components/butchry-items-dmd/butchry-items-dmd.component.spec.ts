import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButchryItemsDmdComponent } from './butchry-items-dmd.component';

describe('ButchryItemsDmdComponent', () => {
  let component: ButchryItemsDmdComponent;
  let fixture: ComponentFixture<ButchryItemsDmdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButchryItemsDmdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButchryItemsDmdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
