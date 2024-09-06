import { TestBed } from '@angular/core/testing';

import { PcdetailService } from './pcdetail.service';

describe('PcdetailService', () => {
  let service: PcdetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PcdetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
