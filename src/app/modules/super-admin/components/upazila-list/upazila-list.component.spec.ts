import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpazilaListComponent } from './upazila-list.component';

describe('UpazilaListComponent', () => {
  let component: UpazilaListComponent;
  let fixture: ComponentFixture<UpazilaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpazilaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpazilaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
