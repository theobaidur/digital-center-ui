import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetUpdateComponent } from './reset-update.component';

describe('ResetUpdateComponent', () => {
  let component: ResetUpdateComponent;
  let fixture: ComponentFixture<ResetUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
