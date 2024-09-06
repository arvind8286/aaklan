import { TestBed } from '@angular/core/testing';

import { StudentBulkService } from './student-bulk.service';

describe('StudentBulkService', () => {
  let service: StudentBulkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentBulkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
