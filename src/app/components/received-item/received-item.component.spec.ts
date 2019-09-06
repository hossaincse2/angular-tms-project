import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedItemComponent } from './received-item.component';

describe('ReceivedItemComponent', () => {
  let component: ReceivedItemComponent;
  let fixture: ComponentFixture<ReceivedItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivedItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
