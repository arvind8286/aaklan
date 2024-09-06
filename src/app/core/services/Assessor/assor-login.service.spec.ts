import { TestBed } from '@angular/core/testing';

import { AssorLoginService } from './assor-login.service';

describe('AssorLoginService', () => {
  let service: AssorLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssorLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
