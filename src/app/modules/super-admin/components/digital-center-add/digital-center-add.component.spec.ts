import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalCenterAddComponent } from './digital-center-add.component';

describe('DigitalCenterAddComponent', () => {
  let component: DigitalCenterAddComponent;
  let fixture: ComponentFixture<DigitalCenterAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalCenterAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalCenterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
