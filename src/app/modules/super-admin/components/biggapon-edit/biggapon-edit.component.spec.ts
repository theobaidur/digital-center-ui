import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiggaponEditComponent } from './biggapon-edit.component';

describe('BiggaponEditComponent', () => {
  let component: BiggaponEditComponent;
  let fixture: ComponentFixture<BiggaponEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiggaponEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiggaponEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
