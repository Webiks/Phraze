import { TestBed } from '@angular/core/testing';

import { GeolocationService } from './geo-location.service';

describe('GeoLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeolocationService = TestBed.get(GeolocationService);
    expect(service).toBeTruthy();
  });
});
