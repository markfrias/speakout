import { TestBed } from '@angular/core/testing';

import { CreatePostsService } from './create-posts.service';

describe('CreatePostsService', () => {
  let service: CreatePostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
