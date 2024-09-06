import { TestBed } from '@angular/core/testing';

import { UploadimgserveService } from './uploadimgserve.service';

describe('UploadimgserveService', () => {
  let service: UploadimgserveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadimgserveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
