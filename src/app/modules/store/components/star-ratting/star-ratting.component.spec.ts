import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarRattingComponent } from './star-ratting.component';

describe('StarRattingComponent', () => {
  let component: StarRattingComponent;
  let fixture: ComponentFixture<StarRattingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarRattingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarRattingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
