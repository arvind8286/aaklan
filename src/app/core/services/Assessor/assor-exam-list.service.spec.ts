import { TestBed } from '@angular/core/testing';

import { AssorExamListService } from './assor-exam-list.service';

describe('AssorExamListService', () => {
  let service: AssorExamListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssorExamListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
