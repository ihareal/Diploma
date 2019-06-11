import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Admin.Control.EventComponent } from './admin.control.event.component';

describe('Admin.Control.EventComponent', () => {
  let component: Admin.Control.EventComponent;
  let fixture: ComponentFixture<Admin.Control.EventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Admin.Control.EventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Admin.Control.EventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
