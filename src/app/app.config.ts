import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { BACKEND_LOGIN_URL, BACKEND_URL } from './helpers/constants';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(),
    {
      provide: BACKEND_LOGIN_URL,
      useValue: 'https://dummyjson.com/auth/login',
    },
    {
      provide: BACKEND_URL,
      useValue: 'https://jsonplaceholder.typicode.com',
    },
  ],
};
