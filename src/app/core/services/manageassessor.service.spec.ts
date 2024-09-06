import { TestBed } from '@angular/core/testing';

import { ManageassessorService } from './manageassessor.service';

describe('ManageassessorService', () => {
  let service: ManageassessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageassessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
