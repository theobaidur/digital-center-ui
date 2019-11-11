import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingAdminPageComponent } from './training-admin-page.component';

describe('TrainingAdminPageComponent', () => {
  let component: TrainingAdminPageComponent;
  let fixture: ComponentFixture<TrainingAdminPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingAdminPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
