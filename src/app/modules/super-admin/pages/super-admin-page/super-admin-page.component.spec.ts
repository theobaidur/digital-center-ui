import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminPageComponent } from './super-admin-page.component';

describe('SuperAdminPageComponent', () => {
  let component: SuperAdminPageComponent;
  let fixture: ComponentFixture<SuperAdminPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
