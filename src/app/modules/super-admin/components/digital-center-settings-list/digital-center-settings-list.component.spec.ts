import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalCenterSettingsListComponent } from './digital-center-settings-list.component';

describe('DigitalCenterSettingsListComponent', () => {
  let component: DigitalCenterSettingsListComponent;
  let fixture: ComponentFixture<DigitalCenterSettingsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalCenterSettingsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalCenterSettingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
