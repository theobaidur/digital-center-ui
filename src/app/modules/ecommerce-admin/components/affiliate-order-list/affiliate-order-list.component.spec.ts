import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateOrderListComponent } from './affiliate-order-list.component';

describe('AffiliateOrderListComponent', () => {
  let component: AffiliateOrderListComponent;
  let fixture: ComponentFixture<AffiliateOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffiliateOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliateOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
