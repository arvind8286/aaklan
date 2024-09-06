import { TestBed } from '@angular/core/testing';

import { JobroleService } from './jobrole.service';

describe('JobroleService', () => {
  let service: JobroleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobroleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
