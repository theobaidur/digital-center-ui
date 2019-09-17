import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreBaseComponent } from './store-base.component';

describe('StoreBaseComponent', () => {
  let component: StoreBaseComponent;
  let fixture: ComponentFixture<StoreBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
