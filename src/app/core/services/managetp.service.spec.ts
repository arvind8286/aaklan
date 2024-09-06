import { TestBed } from '@angular/core/testing';

import { ManagetpService } from './managetp.service';

describe('ManagetpService', () => {
  let service: ManagetpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagetpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
