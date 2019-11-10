import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryAreaAddComponent } from './delivery-area-add.component';

describe('DeliveryAreaAddComponent', () => {
  let component: DeliveryAreaAddComponent;
  let fixture: ComponentFixture<DeliveryAreaAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryAreaAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryAreaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
