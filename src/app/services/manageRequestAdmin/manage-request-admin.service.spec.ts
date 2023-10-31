import { TestBed } from '@angular/core/testing';

import { ManageRequestAdminService } from './manage-request-admin.service';

describe('ManageRequestAdminService', () => {
  let service: ManageRequestAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageRequestAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
