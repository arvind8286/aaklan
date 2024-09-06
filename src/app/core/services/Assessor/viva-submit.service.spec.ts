import { TestBed } from '@angular/core/testing';

import { VivaSubmitService } from './viva-submit.service';

describe('VivaSubmitService', () => {
  let service: VivaSubmitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VivaSubmitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
