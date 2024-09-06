import { TestBed } from '@angular/core/testing';

import { StdReportYearService } from './std-report-year.service';

describe('StdReportYearService', () => {
  let service: StdReportYearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StdReportYearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
