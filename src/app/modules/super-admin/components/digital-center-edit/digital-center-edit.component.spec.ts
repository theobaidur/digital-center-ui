import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalCenterEditComponent } from './digital-center-edit.component';

describe('DigitalCenterEditComponent', () => {
  let component: DigitalCenterEditComponent;
  let fixture: ComponentFixture<DigitalCenterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalCenterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalCenterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
