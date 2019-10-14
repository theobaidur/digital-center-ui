import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingChargeEditComponent } from './shipping-charge-edit.component';

describe('ShippingChargeEditComponent', () => {
  let component: ShippingChargeEditComponent;
  let fixture: ComponentFixture<ShippingChargeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingChargeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingChargeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
