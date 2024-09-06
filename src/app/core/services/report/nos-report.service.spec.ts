import { TestBed } from '@angular/core/testing';

import { NosReportService } from './nos-report.service';

describe('NosReportService', () => {
  let service: NosReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NosReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
