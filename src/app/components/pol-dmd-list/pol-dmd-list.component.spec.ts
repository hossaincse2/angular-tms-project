import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolDmdListComponent } from './pol-dmd-list.component';

describe('PolDmdListComponent', () => {
  let component: PolDmdListComponent;
  let fixture: ComponentFixture<PolDmdListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolDmdListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolDmdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
