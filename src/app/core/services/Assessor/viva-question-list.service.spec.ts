import { TestBed } from '@angular/core/testing';

import { VivaQuestionListService } from './viva-question-list.service';

describe('VivaQuestionListService', () => {
  let service: VivaQuestionListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VivaQuestionListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
