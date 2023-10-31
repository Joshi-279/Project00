import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequestPageComponent } from './create-request-page.component';

describe('CreateRequestPageComponent', () => {
  let component: CreateRequestPageComponent;
  let fixture: ComponentFixture<CreateRequestPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRequestPageComponent]
    });
    fixture = TestBed.createComponent(CreateRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
