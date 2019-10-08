import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpazilaEditComponent } from './upazila-edit.component';

describe('UpazilaEditComponent', () => {
  let component: UpazilaEditComponent;
  let fixture: ComponentFixture<UpazilaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpazilaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpazilaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
