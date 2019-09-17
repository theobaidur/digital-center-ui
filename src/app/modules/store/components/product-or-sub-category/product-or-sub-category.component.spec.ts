import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOrSubCategoryComponent } from './product-or-sub-category.component';

describe('ProductOrSubCategoryComponent', () => {
  let component: ProductOrSubCategoryComponent;
  let fixture: ComponentFixture<ProductOrSubCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOrSubCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOrSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
