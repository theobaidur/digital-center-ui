import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalCenterSettingsAddComponent } from './digital-center-settings-add.component';

describe('DigitalCenterSettingsAddComponent', () => {
  let component: DigitalCenterSettingsAddComponent;
  let fixture: ComponentFixture<DigitalCenterSettingsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalCenterSettingsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalCenterSettingsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
