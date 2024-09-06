import { TestBed } from '@angular/core/testing';

import { BulkQuestAddService } from './bulk-quest-add.service';

describe('BulkQuestAddService', () => {
  let service: BulkQuestAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BulkQuestAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
