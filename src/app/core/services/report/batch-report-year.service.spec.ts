import { TestBed } from '@angular/core/testing';

import { BatchReportYearService } from './batch-report-year.service';

describe('BatchReportYearService', () => {
  let service: BatchReportYearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchReportYearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
