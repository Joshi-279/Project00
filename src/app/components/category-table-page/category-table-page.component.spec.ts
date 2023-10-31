import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTablePageComponent } from './category-table-page.component';

describe('CategoryTablePageComponent', () => {
  let component: CategoryTablePageComponent;
  let fixture: ComponentFixture<CategoryTablePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryTablePageComponent]
    });
    fixture = TestBed.createComponent(CategoryTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
