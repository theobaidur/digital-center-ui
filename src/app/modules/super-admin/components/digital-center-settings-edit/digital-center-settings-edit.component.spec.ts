import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalCenterSettingsEditComponent } from './digital-center-settings-edit.component';

describe('DigitalCenterSettingsEditComponent', () => {
  let component: DigitalCenterSettingsEditComponent;
  let fixture: ComponentFixture<DigitalCenterSettingsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalCenterSettingsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalCenterSettingsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
