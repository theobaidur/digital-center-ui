import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineAddComponent } from './routine-add.component';

describe('RoutineAddComponent', () => {
  let component: RoutineAddComponent;
  let fixture: ComponentFixture<RoutineAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutineAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutineAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
