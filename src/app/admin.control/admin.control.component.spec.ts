import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Admin.ControlComponent } from './admin.control.component';

describe('Admin.ControlComponent', () => {
  let component: Admin.ControlComponent;
  let fixture: ComponentFixture<Admin.ControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Admin.ControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Admin.ControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
