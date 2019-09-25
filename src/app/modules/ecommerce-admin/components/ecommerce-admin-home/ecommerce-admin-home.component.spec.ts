import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceAdminHomeComponent } from './ecommerce-admin-home.component';

describe('EcommerceAdminHomeComponent', () => {
  let component: EcommerceAdminHomeComponent;
  let fixture: ComponentFixture<EcommerceAdminHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcommerceAdminHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcommerceAdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
