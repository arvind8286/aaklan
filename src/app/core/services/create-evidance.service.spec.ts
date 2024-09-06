import { TestBed } from '@angular/core/testing';

import { CreateEvidanceService } from './create-evidance.service';

describe('CreateEvidanceService', () => {
  let service: CreateEvidanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateEvidanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
