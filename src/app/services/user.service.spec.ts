import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../helpers/constants';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/user';

const testData: Partial<User>[] = [
  {
    id: 1,
    name: 'test',
    phone: '0501234567',
  },
];

describe('UserService', () => {
  let service: UserService;
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
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
    url = TestBed.inject(BACKEND_URL);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the proper data from getUsers', async () => {
    const response = firstValueFrom(service.getUsers());
    const fakeRequest = httpTestingController.expectOne(`${url}/users`);
    fakeRequest.flush(testData);
    await expectAsync(response).already.toBeResolvedTo(testData as User[]);
    httpTestingController.verify();
  });
});
