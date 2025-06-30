import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { environment } from '../environments/environment';

import { baseUrlInterceptor } from './base-url-interceptor';

describe('baseUrlInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => baseUrlInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should prepend baseUrl and trim slashes', () => {
    environment.apiUrl = 'https://api.example.com/';

    const req = new HttpRequest('GET', '/test/path/', null);
    const next = jasmine.createSpy('next');

    interceptor(req, next);

    expect(next).toHaveBeenCalledWith(
      jasmine.objectContaining({
        url: 'https://api.example.com/test/path',
      }),
    );
  });

  it('should not add duplicate slashes', () => {
    environment.apiUrl = 'https://api.example.com//';
    const req = new HttpRequest('POST', '//foo/bar//', {});
    const next = jasmine.createSpy('next');

    interceptor(req, next);

    expect(next).toHaveBeenCalledWith(
      jasmine.objectContaining({
        url: 'https://api.example.com/foo/bar',
      }),
    );
  });
});
