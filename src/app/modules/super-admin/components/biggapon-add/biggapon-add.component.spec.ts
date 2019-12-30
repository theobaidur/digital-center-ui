import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiggaponAddComponent } from './biggapon-add.component';

describe('BiggaponAddComponent', () => {
  let component: BiggaponAddComponent;
  let fixture: ComponentFixture<BiggaponAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiggaponAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiggaponAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
