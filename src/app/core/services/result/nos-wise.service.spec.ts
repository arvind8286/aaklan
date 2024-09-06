import { TestBed } from '@angular/core/testing';

import { NosWiseService } from './nos-wise.service';

describe('NosWiseService', () => {
  let service: NosWiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NosWiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
