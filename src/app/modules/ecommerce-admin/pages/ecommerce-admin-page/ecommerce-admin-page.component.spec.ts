import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceAdminPageComponent } from './ecommerce-admin-page.component';

describe('EcommerceAdminPageComponent', () => {
  let component: EcommerceAdminPageComponent;
  let fixture: ComponentFixture<EcommerceAdminPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcommerceAdminPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcommerceAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
