import { TestBed } from '@angular/core/testing';

import { QuestionSolveService } from './question-solve.service';

describe('QuestionSolveService', () => {
  let service: QuestionSolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionSolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
