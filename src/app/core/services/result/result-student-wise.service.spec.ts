import { TestBed } from '@angular/core/testing';

import { ResultStudentWiseService } from './result-student-wise.service';

describe('ResultStudentWiseService', () => {
  let service: ResultStudentWiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultStudentWiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
