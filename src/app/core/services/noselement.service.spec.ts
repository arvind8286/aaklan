import { TestBed } from '@angular/core/testing';

import { NoselementService } from './noselement.service';

describe('NoselementService', () => {
  let service: NoselementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoselementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
