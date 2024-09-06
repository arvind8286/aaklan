import { TestBed } from '@angular/core/testing';

import { ExamimageService } from './examimage.service';

describe('ExamimageService', () => {
  let service: ExamimageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamimageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
