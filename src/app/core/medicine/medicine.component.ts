import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { PaginatorModule } from 'primeng/paginator';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { Paginable } from '../shared/paginable.model';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { MultiSelectModule } from 'primeng/multiselect';
import { ColumnFilter, TableModule } from 'primeng/table';
import { Medicine, ResponseMedicine } from './models/medicine';
import { FilterMedicines } from './models/filtersMedicine';
import { MedicineService } from './service/medicine.service';
import { CreateRequestComponent } from './create-request/create-request.component';

@Component({
  selector: 'app-medicine',
  imports: [TableModule, CommonModule, InputTextModule, TagModule, FormsModule, DividerModule, PaginatorModule, CardModule, AvatarModule, CreateRequestComponent,
    SelectModule, MultiSelectModule, ButtonModule, IconFieldModule, InputIconModule, TooltipModule, KeyFilterModule],
  templateUrl: './medicine.component.html',
  styleUrl: './medicine.component.scss'
})
export class MedicineComponent {
  paginable: Paginable = {} as Paginable;
  medicines: ResponseMedicine[] = []
  filterOpen: boolean = false;
  typeCoverage: any[] = [{ name: 'En cobertura', value: true }, { name: 'Fuera de cobertura', value: false }];
  filterMedicines: FilterMedicines = {} as FilterMedicines
  loading: boolean = false;
  medicineReq: Medicine | null = null;
  openModal: boolean = false

  constructor(private medicineService: MedicineService) {
    this.listMedicines();
  }

  onPageChange(event: any) {
    event.pageCount = this.paginable.totalPages
    this.filterMedicines.pagCurrent = event.page;
    this.filterMedicines.cantRecords = event.rows;
    this.listMedicines();
  }


  listMedicines() {
    this.medicines = [];
    this.loading = !this.loading;
    this.medicineService.listMedicine(this.filterMedicines).subscribe(response => {
      this.medicines = response.medicines;
      this.paginable = response.paginable;
      this.loading = !this.loading;
    })

  }

  onSelectionChange() {
    this.filterMedicines.pagCurrent = null;
    this.listMedicines();
  }

  hidenOverlay(event: ColumnFilter) {
    event.hide();
    this.listMedicines();
  }

  createRequest(medicineCreate: Medicine) {
    this.medicineReq = medicineCreate;
    this.openModal = true;

  }

  search(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim();
    const numberValue = Number(value);

    this.filterMedicines.code = !isNaN(numberValue) && value !== '' ? numberValue : null;
    this.filterMedicines.name = isNaN(numberValue) ? value : null;

    this.listMedicines();
  }

}
