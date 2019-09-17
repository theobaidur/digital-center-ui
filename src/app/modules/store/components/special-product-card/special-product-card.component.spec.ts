import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialProductCardComponent } from './special-product-card.component';

describe('SpecialProductCardComponent', () => {
  let component: SpecialProductCardComponent;
  let fixture: ComponentFixture<SpecialProductCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialProductCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
