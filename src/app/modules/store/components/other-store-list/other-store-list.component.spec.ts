import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherStoreListComponent } from './other-store-list.component';

describe('OtherStoreListComponent', () => {
  let component: OtherStoreListComponent;
  let fixture: ComponentFixture<OtherStoreListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherStoreListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherStoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
