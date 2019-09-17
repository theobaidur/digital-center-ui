import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootCategoryCardComponent } from './root-category-card.component';

describe('RootCategoryCardComponent', () => {
  let component: RootCategoryCardComponent;
  let fixture: ComponentFixture<RootCategoryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootCategoryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootCategoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
