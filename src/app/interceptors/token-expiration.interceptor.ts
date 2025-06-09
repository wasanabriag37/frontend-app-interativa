import { HttpInterceptorFn } from '@angular/common/http';
import { TokenServiceService } from '../login/service/token-service.service';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';

export const tokenExpirationInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenServiceService);
  const messageService = inject(MessageService);
  if (!tokenService.isValidToken() && tokenService.getToken()) {
    setTimeout(() => {
      messageService.add({
        severity: 'warn',
        summary: 'Sesión expirada',
        detail: 'Su sesión ha expirado, por favor inicie sesión nuevamente.',
        life: 5000,
      });
    }, 100)
    tokenService.logout();
  }
  return next(req);
};