import { TestBed } from '@angular/core/testing';

import { InstructcandidateService } from './instructcandidate.service';

describe('InstructcandidateService', () => {
  let service: InstructcandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstructcandidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
