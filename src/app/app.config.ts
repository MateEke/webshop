import {
  ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { baseUrlInterceptor } from './base-url-interceptor';
import { errorInterceptor } from './error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([baseUrlInterceptor, errorInterceptor])),
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
  ],
};
