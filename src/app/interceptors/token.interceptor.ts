import { HttpInterceptorFn } from '@angular/common/http';
import { TokenServiceService } from '../login/service/token-service.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token: string | unknown = inject(TokenServiceService).getToken();
  const newRequest = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`)
  });
  return next(newRequest);
};
