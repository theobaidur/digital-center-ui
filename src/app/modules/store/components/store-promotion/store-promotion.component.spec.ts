import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePromotionComponent } from './store-promotion.component';

describe('StorePromotionComponent', () => {
  let component: StorePromotionComponent;
  let fixture: ComponentFixture<StorePromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorePromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
