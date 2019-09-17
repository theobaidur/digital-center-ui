import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherStoresComponent } from './other-stores.component';

describe('OtherStoresComponent', () => {
  let component: OtherStoresComponent;
  let fixture: ComponentFixture<OtherStoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherStoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
