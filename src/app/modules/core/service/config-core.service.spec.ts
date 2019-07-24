import { TestBed } from '@angular/core/testing';

import { ConfigCoreService } from './config-core.service';

describe('ConfigCoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigCoreService = TestBed.get(ConfigCoreService);
    expect(service).toBeTruthy();
  });
});
