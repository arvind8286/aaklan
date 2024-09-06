import { TestBed } from '@angular/core/testing';

import { AssignservService } from './assignserv.service';

describe('AssignservService', () => {
  let service: AssignservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
