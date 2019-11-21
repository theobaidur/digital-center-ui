import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryAreaEditComponent } from './delivery-area-edit.component';

describe('DeliveryAreaEditComponent', () => {
  let component: DeliveryAreaEditComponent;
  let fixture: ComponentFixture<DeliveryAreaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryAreaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryAreaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
