import { TestBed } from '@angular/core/testing';

import { ModifyPostsService } from './modify-posts.service';

describe('ModifyPostsService', () => {
  let service: ModifyPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModifyPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
