import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenServiceService } from '../login/service/token-service.service'

export const authGuard: CanActivateFn = () => {
  const tokenValid: boolean = inject(TokenServiceService).isValidToken();
  const token: string | unknown = inject(TokenServiceService).getToken();
  if (!token || !tokenValid) {
    inject(TokenServiceService).logout();
    return false;
  }
  return true;
};
