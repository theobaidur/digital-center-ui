import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackVerifyOrderComponent } from './track-verify-order.component';

describe('TrackVerifyOrderComponent', () => {
  let component: TrackVerifyOrderComponent;
  let fixture: ComponentFixture<TrackVerifyOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackVerifyOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackVerifyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
