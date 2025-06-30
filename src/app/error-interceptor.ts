import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router: Router = inject(Router);
  return next(req).pipe(
    catchError((error) => {
      router.navigate(['/error']);

      throw error;
    }),
  );
};
