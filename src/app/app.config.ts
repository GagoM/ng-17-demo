import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BACKEND_URL } from './helpers/constants';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: BACKEND_URL,
      useValue: 'https://dummyjson.com/auth/login',
    },
  ],
};
