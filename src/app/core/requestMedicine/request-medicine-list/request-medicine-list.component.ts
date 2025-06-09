import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { FloatLabel } from 'primeng/floatlabel';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';
import { ColumnFilter, Table, TableModule, TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { ResponseRequestMedicine } from '../models/response-request-medicine';
import { Paginable } from '../../shared/paginable.model';
import { FilterRequestMedicine } from '../models/filter-request-medicine';
import { RequestMedicineListService } from '../service/request-medicine-list.service';
import { MessageService } from 'primeng/api';
import { Medicine } from '../models/medicine';
import { UserResponse } from '../models/user';

@Component({
  selector: 'app-request-medicine-list',
  imports: [TableModule, CommonModule, InputTextModule, TagModule, FormsModule, DividerModule, PaginatorModule, FloatLabel, CardModule, AvatarModule,
    SelectModule, MultiSelectModule, ButtonModule, IconFieldModule, InputIconModule, TooltipModule, KeyFilterModule],
  templateUrl: './request-medicine-list.component.html',
  styleUrl: './request-medicine-list.component.scss'
})
export class RequestMedicineListComponent {
  requestsMedicines: ResponseRequestMedicine[] = [];
  paginable: Paginable = {} as Paginable;
  filterRequestMedicine: FilterRequestMedicine = {} as FilterRequestMedicine;
  loading: boolean = false;
  filterOpen: boolean = false;
  expandedRows = {};
  typeCoverage: any[] = [{ name: 'En cobertura', value: true }, { name: 'Fuera de cobertura', value: false }];
  typeMedicines: Medicine[] = [];
  users: UserResponse[] = []

  constructor(private listRequestService: RequestMedicineListService, private messageService: MessageService) {
    this.listRequestMedicine();
    this.listUsers();
    this.listMedicines();

  }

  hidenOverlay(event: ColumnFilter) {
    event.hide();
    this.listRequestMedicine();
  }

  onSelectionChange() {
    this.filterRequestMedicine.pagCurrent = null;
    this.listRequestMedicine();
  }

  listRequestMedicine() {
    this.requestsMedicines = [];
    this.loading = !this.loading;
    this.listRequestService.listMedicine(this.filterRequestMedicine).subscribe(response => {
      this.requestsMedicines = response.requestsMedicines;
      this.paginable = response.paginable;
      this.loading = !this.loading;
    })
  }

  onPageChange(event: any) {
    event.pageCount = this.paginable.totalPages
    this.filterRequestMedicine.pagCurrent = event.page;
    this.filterRequestMedicine.cantRecords = event.rows;
    this.listRequestMedicine();
  }

  capitalizerWord(texto: string): string {
    return texto
      .toLowerCase()
      .split(' ')
      .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
      .join(' ');
  }

  listMedicines() {
    this.listRequestService.listMedicinesUn().subscribe({
      next: (response) => {
        this.typeMedicines = response.medicines;
      },
      error: (error) => {
        console.error('Error loading estados:', error);
      }
    });
  }

  listUsers() {
    this.listRequestService.listUsers().subscribe({
      next: (response) => {
        this.users = response.users;
      },
      error: (error) => {
        console.error('Error loading estados:', error);
      }
    });
  }

  search(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim();
    const numberValue = Number(value);
    this.filterRequestMedicine.numberOrder = !isNaN(numberValue) && value !== '' ? numberValue : null;
    this.filterRequestMedicine.nameMedicine = isNaN(numberValue) ? value : null;
    this.listRequestMedicine();
    console.log(this.filterRequestMedicine);
    
  }

  clear(table: Table) {
    this.filterRequestMedicine = {} as FilterRequestMedicine;
    this.listRequestMedicine();
    table.clear();
  }

}
