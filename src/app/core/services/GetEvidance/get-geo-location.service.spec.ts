import { TestBed } from '@angular/core/testing';

import { GetGeoLocationService } from './get-geo-location.service';

describe('GetGeoLocationService', () => {
  let service: GetGeoLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetGeoLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
