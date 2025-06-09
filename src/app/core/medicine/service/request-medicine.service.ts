import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/enviromment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestMedicineService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  createRequestMedicine(requestMedicine: any) {
    const url = `${this.apiUrl}requestMedicine/createRequest`;
    return this.http.post<any>(url, requestMedicine).pipe(map((response: any) => {
      return response;
    }),
      catchError((error) => {
        return throwError(() => error);
      }));
  }
}
