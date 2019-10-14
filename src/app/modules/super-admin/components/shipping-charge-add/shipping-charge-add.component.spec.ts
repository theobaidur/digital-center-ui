import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingChargeAddComponent } from './shipping-charge-add.component';

describe('ShippingChargeAddComponent', () => {
  let component: ShippingChargeAddComponent;
  let fixture: ComponentFixture<ShippingChargeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingChargeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingChargeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
