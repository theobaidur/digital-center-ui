import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnionEditComponent } from './union-edit.component';

describe('UnionEditComponent', () => {
  let component: UnionEditComponent;
  let fixture: ComponentFixture<UnionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
