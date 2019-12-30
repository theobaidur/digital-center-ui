import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiggaponListComponent } from './biggapon-list.component';

describe('BiggaponListComponent', () => {
  let component: BiggaponListComponent;
  let fixture: ComponentFixture<BiggaponListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiggaponListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiggaponListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
