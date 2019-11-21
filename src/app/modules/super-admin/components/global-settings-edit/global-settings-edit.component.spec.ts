import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSettingsEditComponent } from './global-settings-edit.component';

describe('GlobalSettingsEditComponent', () => {
  let component: GlobalSettingsEditComponent;
  let fixture: ComponentFixture<GlobalSettingsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalSettingsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSettingsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
