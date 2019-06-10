import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { User.AreaComponent } from './user.area.component';

describe('User.AreaComponent', () => {
  let component: User.AreaComponent;
  let fixture: ComponentFixture<User.AreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ User.AreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(User.AreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
