import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { provideRouter, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { errorInterceptor } from './error-interceptor';

describe('errorInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => errorInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          {
            path: 'error',
            component: class ErrorComponent {},
          },
        ]),
      ],
    });
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should navigate to /error on error', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    const req = new HttpRequest('GET', '/test/path', null);

    const next = jasmine
      .createSpy('next')
      .and.returnValue(throwError(() => new Error('test-error')));

    interceptor(req, next).subscribe({
      error: (err) => {
        expect(err.message).toEqual('test-error');
        expect(router.navigate).toHaveBeenCalledWith(['/error']);
      },
    });
  });
});
