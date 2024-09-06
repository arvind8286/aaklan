import { TestBed } from '@angular/core/testing';

import { NosdetailsService } from './nosdetails.service';

describe('NosdetailsService', () => {
  let service: NosdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NosdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
