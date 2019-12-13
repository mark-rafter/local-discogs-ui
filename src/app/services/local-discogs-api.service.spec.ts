import { TestBed } from '@angular/core/testing';

import { LocalDiscogsApiService } from './local-discogs-api.service';

describe('LocalDiscogsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalDiscogsApiService = TestBed.get(LocalDiscogsApiService);
    expect(service).toBeTruthy();
  });
});
