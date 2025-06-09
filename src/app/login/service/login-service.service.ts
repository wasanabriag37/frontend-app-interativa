import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenServiceService } from './token-service.service';
import { ResponseLogin } from '../models/tokenResponse';
import { environment } from '../../../environment/enviromment'
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private tokenService: TokenServiceService) { }

  login(email: string, password: string) {
    return this.http.post<ResponseLogin>(`${this.apiUrl}auth/login`, {
      email,
      password
    }).pipe(tap(response => {
      this.tokenService.savetoken(response.token)
    }))
  }

  logout() {
    this.tokenService.logout();
  }
}
