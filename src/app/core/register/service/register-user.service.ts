import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/enviromment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  registerUser(data: any) {
    console.log(data);
    
    return this.http.post<any>(`${this.apiUrl}auth/register`, data).pipe(map((response: any) => {
      return response;
    }),
      catchError((error) => {
        return throwError(() => error);
    }));
  }
}
