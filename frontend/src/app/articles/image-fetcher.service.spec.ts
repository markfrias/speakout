import { TestBed } from '@angular/core/testing';

import { ImageFetcherService } from './image-fetcher.service';

describe('ImageFetcherService', () => {
  let service: ImageFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
