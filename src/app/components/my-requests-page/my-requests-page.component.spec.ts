import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRequestsPageComponent } from './my-requests-page.component';

describe('MyRequestsPageComponent', () => {
  let component: MyRequestsPageComponent;
  let fixture: ComponentFixture<MyRequestsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyRequestsPageComponent]
    });
    fixture = TestBed.createComponent(MyRequestsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
