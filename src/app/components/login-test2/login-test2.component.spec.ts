import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTest2Component } from './login-test2.component';

describe('LoginTest2Component', () => {
  let component: LoginTest2Component;
  let fixture: ComponentFixture<LoginTest2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginTest2Component]
    });
    fixture = TestBed.createComponent(LoginTest2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
