import { TestBed } from '@angular/core/testing';

import { FinishTestService } from './finish-test.service';

describe('FinishTestService', () => {
  let service: FinishTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinishTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
