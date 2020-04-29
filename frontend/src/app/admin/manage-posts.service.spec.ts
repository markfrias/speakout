/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ManagePostsService } from './manage-posts.service';

describe('Service: ManagePosts', () => {
  let service: ManagePostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
      service = TestBed.inject(ManagePostsService);
  });

  it('should ...', inject([ManagePostsService], (service: ManagePostsService) => {
    expect(service).toBeTruthy();
  }));
});
