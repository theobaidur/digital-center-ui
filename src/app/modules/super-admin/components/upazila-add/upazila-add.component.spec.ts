import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpazilaAddComponent } from './upazila-add.component';

describe('UpazilaAddComponent', () => {
  let component: UpazilaAddComponent;
  let fixture: ComponentFixture<UpazilaAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpazilaAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpazilaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
