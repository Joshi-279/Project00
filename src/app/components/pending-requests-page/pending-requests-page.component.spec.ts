import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRequestsPageComponent } from './pending-requests-page.component';

describe('PendingRequestsPageComponent', () => {
  let component: PendingRequestsPageComponent;
  let fixture: ComponentFixture<PendingRequestsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingRequestsPageComponent]
    });
    fixture = TestBed.createComponent(PendingRequestsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
