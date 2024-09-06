import { TestBed } from '@angular/core/testing';

import { ExamstudentListService } from './examstudent-list.service';

describe('ExamstudentListService', () => {
  let service: ExamstudentListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamstudentListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
