import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalCenterListComponent } from './digital-center-list.component';

describe('DigitalCenterListComponent', () => {
  let component: DigitalCenterListComponent;
  let fixture: ComponentFixture<DigitalCenterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalCenterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalCenterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
