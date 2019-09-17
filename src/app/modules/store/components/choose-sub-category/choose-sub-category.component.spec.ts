import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSubCategoryComponent } from './choose-sub-category.component';

describe('ChooseSubCategoryComponent', () => {
  let component: ChooseSubCategoryComponent;
  let fixture: ComponentFixture<ChooseSubCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseSubCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
