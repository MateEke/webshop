import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = trimSlashes(environment.apiUrl);
  const reqUrl = trimSlashes(req.url);

  const cloneReq = req.clone({
    url: `${baseUrl}/${reqUrl}`,
  });
  return next(cloneReq);
};

const trimSlashes: (url: string) => string = (url) => {
  return url.replace(/^[\\/]+|[\\/]+$/g, '');
};
