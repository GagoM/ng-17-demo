import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BACKEND_URL } from '../helpers/constants';
import { PostsService } from './posts.service';
import { firstValueFrom } from 'rxjs';

describe('PostsService', () => {
  let service: PostsService;
  let httpTestingController: HttpTestingController;
  let url: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BACKEND_URL,
          useValue: 'https://jsonplaceholder.typicode.com',
        },
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PostsService);
    httpTestingController = TestBed.inject(HttpTestingController);
    url = TestBed.inject(BACKEND_URL);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const postTestData = {
    userId: 1,
    id: 1,
    title: 'test',
    body: 'test',
  };

  const commentTestData = {
    postId: 1,
    id: 1,
    name: 'test',
    email: 'test',
    body: 'test',
  };

  it('fetch posts', async () => {
    const response = firstValueFrom(service.fetchPosts(1));
    const fakePostsRsquest = httpTestingController.expectOne(
      `${service.url}/1/posts`
    );
    fakePostsRsquest.flush([postTestData]);
    const fakeCommentsRequest = httpTestingController.expectOne(
      `${service.url}/1/comments`
    );
    fakeCommentsRequest.flush([commentTestData]);
    await expectAsync(response).already.toBeResolvedTo([
      { ...postTestData, comments: [commentTestData] },
    ]);
  });
});
