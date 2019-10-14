import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingChargeListComponent } from './shipping-charge-list.component';

describe('ShippingChargeListComponent', () => {
  let component: ShippingChargeListComponent;
  let fixture: ComponentFixture<ShippingChargeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingChargeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingChargeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
