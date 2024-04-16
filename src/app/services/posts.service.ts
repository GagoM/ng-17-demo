import { Inject, Injectable } from '@angular/core';
import { BACKEND_URL } from '../helpers/constants';
import {
  Observable,
  combineLatest,
  concatMap,
  endWith,
  exhaustMap,
  forkJoin,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
  toArray,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  url: string;

  constructor(
    @Inject(BACKEND_URL) private baseUrl: string,
    private http: HttpClient
  ) {
    this.url = `${baseUrl}/posts`;
  }

  fetchPosts(userId: number): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${this.url}/${userId}/posts`)
      .pipe(
        switchMap((posts) => posts),
        mergeMap((post) =>
          combineLatest([
            of(post),
            this.http.get(`${this.url}/${post.id}/comments`),
          ])
        ),
        map((postAndComments) => {
          const post = postAndComments[0];
          post.comments = postAndComments[1] as Comment[];
          return post;
        }),
        toArray()
      )
  }
}
