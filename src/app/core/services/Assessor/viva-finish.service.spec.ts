import { TestBed } from '@angular/core/testing';

import { VivaFinishService } from './viva-finish.service';

describe('VivaFinishService', () => {
  let service: VivaFinishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VivaFinishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
