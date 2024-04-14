import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { BACKEND_URL } from '../helpers/constants';
import { LoginResponse } from '../login_response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject(BACKEND_URL) private baseUrl: string
  ) {}

  login(username: string, password: string): Observable<LoginResponse> {
    console.log(`trying log in using: ${username}, ${password}`);
    return this.http
      .post<LoginResponse>(this.baseUrl, {
        username: 'kminchelle',
        password: '0lelplR',
        expiresInMins: 30,
      })
  }
}
