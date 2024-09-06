import { TestBed } from '@angular/core/testing';

import { CountrydataService } from './countrydata.service';

describe('CountrydataService', () => {
  let service: CountrydataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountrydataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
