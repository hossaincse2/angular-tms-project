import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsdLoginComponent } from './ssd-login.component';

describe('SsdLoginComponent', () => {
  let component: SsdLoginComponent;
  let fixture: ComponentFixture<SsdLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsdLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsdLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
