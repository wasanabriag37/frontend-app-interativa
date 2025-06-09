import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/enviromment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { FilterRequestMedicine } from '../models/filter-request-medicine';
import { ResponseRequestMedicine } from '../models/response-request-medicine';
import { Paginable } from '../../shared/paginable.model';
import { UserResponse } from '../models/user';
import { Medicine } from '../models/medicine';

@Injectable({
  providedIn: 'root'
})
export class RequestMedicineListService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  listMedicine(filterRequestMedicine: FilterRequestMedicine): Observable<{ requestsMedicines: ResponseRequestMedicine[]; paginable: Paginable }> {
    const url = `${this.apiUrl}requestMedicine/getRequestMedicinePag`;
    let params = new HttpParams().set('cantidadRegistros', filterRequestMedicine.cantRecords ?? '')
      .set('PaginaActual', filterRequestMedicine.pagCurrent ?? '')
      .set("nameMedicine", filterRequestMedicine.nameMedicine ?? '')
      .set("code", filterRequestMedicine.code ?? '')
      .set("requestMedicineId", filterRequestMedicine.requestMedicineId ?? '')
      .set("numberOrder", filterRequestMedicine.numberOrder ?? '')
      .set("coveragePos", filterRequestMedicine.coveragePos ?? '')
      .set("creationDate", filterRequestMedicine.creationDate ?? '')

    const appendArrayParams = (paramName: string, values: number[] | null) => {
      values?.forEach(value => {
        params = params.append(paramName, value.toString());
      });
    };
    appendArrayParams('usersIds', filterRequestMedicine.usersIds);
    appendArrayParams('medicineIds', filterRequestMedicine.medicineIds);
    return this.http.get<ResponseRequestMedicine>(url, {
      params: params
    }).pipe(
      map((response: any) => {
        const requestsMedicines: ResponseRequestMedicine[] = (response && response.content && Array.isArray(response.content)) ? response.content : [];
        const paginable: Paginable = {
          totalPages: (response && response.totalPages) ? response.totalPages : 0,
          totalElements: (response && response.totalElements) ? response.totalElements : 0,
          numberOfElements: (response && response.numberOfElements) ? response.numberOfElements : 0,
          pagCurrent: (response && response.number) ? (response.number) : 0,
          elementFirst: (response && response.pageable) ? (response.pageable.offset) : 0,
          elementLast: (response && response.pageable) ? (response.pageable.pageSize) : 0
        };
        return { requestsMedicines, paginable };
      }))
  }

  listUsers(): Observable<{ users: UserResponse[] }> {
    const url = `${this.apiUrl}user/v1/getAll`;
    return this.http.get<UserResponse>(url).pipe(
      map((response: any) => {
        const users: UserResponse[] = response;
        return { users };
      }))
  }

  listMedicinesUn(): Observable<{ medicines: Medicine[] }> {
    const url = `${this.apiUrl}medicine/getAll`;
    return this.http.get<Medicine>(url).pipe(
      map((response: any) => {
        const medicines: Medicine[] = response;
        return { medicines };
      }))
  }
}
