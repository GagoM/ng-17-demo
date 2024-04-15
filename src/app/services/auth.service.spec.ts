import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';
import { BACKEND_LOGIN_URL } from '../helpers/constants';
import { firstValueFrom } from 'rxjs';
import { Inject, InjectionToken, inject } from '@angular/core';
import { USER_MOCK } from '../../mocks/user.mock';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;
  let backendUrl: string;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: BACKEND_LOGIN_URL,
          useValue: 'https://dummyjson.com/auth/login',
        },
      ],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    backendUrl = TestBed.inject(BACKEND_LOGIN_URL);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should properly return data on success', async () => {
    const reponse = firstValueFrom(service.login('asd', 'asd'));
    const fakeRequest = httpController.expectOne(`${backendUrl}`);
    fakeRequest.flush(USER_MOCK);
    await expectAsync(reponse).already.toBeResolvedTo(USER_MOCK);
    httpController.verify();
  });
});
