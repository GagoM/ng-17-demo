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
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';

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

  // fetchPosts(userId: number): Observable<Post[]> {
  fetchPosts(userId: number): void {
    this.http
      .get<Post[]>(`${this.url}/${userId}/posts`)
      .pipe(
        switchMap(posts => posts),
        mergeMap(post => combineLatest([of(post), this.http.get(`${this.url}/${post.id}/comments`)])),
        map(postAndComments => {
          const post = postAndComments[0];
          post.comments = postAndComments[1] as Comment[];
          return post;
        }),
      )
      .subscribe({
        next: (res) => console.log(res),
        error: (err) => console.error(err),
        complete: () => console.log('finished!!')
      });
  }
}
