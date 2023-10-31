import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkProductPageComponent } from './bulk-product-page.component';

describe('BulkProductPageComponent', () => {
  let component: BulkProductPageComponent;
  let fixture: ComponentFixture<BulkProductPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkProductPageComponent]
    });
    fixture = TestBed.createComponent(BulkProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
