import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTablePageComponent } from './product-table-page.component';

describe('ProductTablePageComponent', () => {
  let component: ProductTablePageComponent;
  let fixture: ComponentFixture<ProductTablePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductTablePageComponent]
    });
    fixture = TestBed.createComponent(ProductTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
