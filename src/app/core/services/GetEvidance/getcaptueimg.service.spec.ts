import { TestBed } from '@angular/core/testing';

import { GetcaptueimgService } from './getcaptueimg.service';

describe('GetcaptueimgService', () => {
  let service: GetcaptueimgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetcaptueimgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
