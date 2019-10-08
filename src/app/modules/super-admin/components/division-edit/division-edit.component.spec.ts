import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionEditComponent } from './division-edit.component';

describe('DivisionEditComponent', () => {
  let component: DivisionEditComponent;
  let fixture: ComponentFixture<DivisionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
