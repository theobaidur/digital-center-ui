import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnionAddComponent } from './union-add.component';

describe('UnionAddComponent', () => {
  let component: UnionAddComponent;
  let fixture: ComponentFixture<UnionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
