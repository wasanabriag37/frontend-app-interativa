import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenServiceService } from './token-service.service';

@Injectable({
  providedIn: 'root',
})
export class ExpirationService {
  constructor(
    private tokenService: TokenServiceService,
    private router: Router
  ) {
    this.setupGlobalListener();
  }

  private setupGlobalListener(): void {
    window.addEventListener('click', () => {
      if (!this.tokenService.isValidToken()) {
        this.tokenService.logout();
      }
    });
  }
}
