import { TestBed } from '@angular/core/testing';

import { GeocodingService } from './geocoding.service';

describe('GeocodingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeocodingService = TestBed.get(GeocodingService);
    expect(service).toBeTruthy();
  });
});
