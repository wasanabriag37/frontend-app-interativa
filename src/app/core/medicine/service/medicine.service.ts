import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilterMedicines } from '../models/filtersMedicine';
import { ResponseMedicine } from '../models/medicine';
import { Paginable } from '../../shared/paginable.model';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environment/enviromment';


@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  listMedicine(filterMedicine: FilterMedicines): Observable<{ medicines: ResponseMedicine[]; paginable: Paginable }> {
    const url = `${this.apiUrl}medicine/getPag`;
    const params = new HttpParams().set('cantidadRegistros', filterMedicine.cantRecords ?? '')
      .set('PaginaActual', filterMedicine.pagCurrent ?? '')
      .set("nombreMedicamento", filterMedicine.name ?? '')
      .set("codigo", filterMedicine.code ?? '')
      .set("coberturaPos", filterMedicine.coveragePos ?? '')

    return this.http.get<ResponseMedicine>(url, {
      params: params
    }).pipe(
      map((response: any) => {
        const medicines: ResponseMedicine[] = (response && response.content && Array.isArray(response.content)) ? response.content : [];
        const paginable: Paginable = {
          totalPages: (response && response.totalPages) ? response.totalPages : 0,
          totalElements: (response && response.totalElements) ? response.totalElements : 0,
          numberOfElements: (response && response.numberOfElements) ? response.numberOfElements : 0,
          pagCurrent: (response && response.number) ? (response.number) : 0,
          elementFirst: (response && response.pageable) ? (response.pageable.offset) : 0,
          elementLast: (response && response.pageable) ? (response.pageable.pageSize) : 0
        };
        return { medicines, paginable };
      }))
  }
}
