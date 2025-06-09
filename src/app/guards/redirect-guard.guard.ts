import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenServiceService } from '../login/service/token-service.service'

export const redirectGuardGuard: CanActivateFn = () => {
  const tokenValid: boolean = inject(TokenServiceService).isValidToken();
  const token: string | unknown = inject(TokenServiceService).getToken();
  if (token && tokenValid) {
    inject(Router).navigate(['/home']);
  }
  return true;
};
