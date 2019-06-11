import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Admin.Control.PollutionComponent } from './admin.control.pollution.component';

describe('Admin.Control.PollutionComponent', () => {
  let component: Admin.Control.PollutionComponent;
  let fixture: ComponentFixture<Admin.Control.PollutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Admin.Control.PollutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Admin.Control.PollutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
