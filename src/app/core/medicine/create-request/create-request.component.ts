import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Medicine } from '../models/medicine';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CommonModule } from '@angular/common';
import { RequestMedicineService } from '../service/request-medicine.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-request',
  imports: [DialogModule, FormsModule, ReactiveFormsModule, CommonModule,
    InputTextModule, ButtonModule, IconFieldModule, InputIconModule,],
  templateUrl: './create-request.component.html',
  styleUrl: './create-request.component.scss'
})
export class CreateRequestComponent {
  @Input() displayModal: boolean = false;
  @Input() medicine: Medicine | null = null
  fromCreated!: FormGroup
  @Output() closeModalEvent = new EventEmitter<void>();
  loading: boolean =false;

  constructor(private fb: FormBuilder, private createRequestMedicine: RequestMedicineService) {

  }

  ngOnChanges() {
    this.initializeForm();
    if (this.displayModal) {
      this.displayModal = true
    }
  }

  saveRequest() {
    if(this.fromCreated.invalid){
      this.fromCreated.markAllAsTouched();
      return;
    } 
    this.createRequestMedicine.createRequestMedicine(this.fromCreated.value).subscribe({
      next: (result) => {
        const formattedId = result.requestMedicineId.toString().padStart(4, '0');
        this.loading = !this.loading;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Se ha creado la solicitud N°.' + formattedId,
          confirmButtonColor: '#3b82f6',
          confirmButtonText: 'Aceptar',
          customClass: {
            container: 'swal-over-modal'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            this.handleDialogClose()
          }
        });
      },
      error: (error) => {
        console.log(error);
        
        this.loading = !this.loading;
        Swal.fire({
          icon: 'error',
          title: '¡Algo salió mal!',
          text: 'Se ha presentado un error al guardar.',
          confirmButtonColor: '#3b82f6',
          confirmButtonText: 'Aceptar',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          customClass: {
            container: 'swal-over-modal'
          }
        });
      }
    
    })
  }

  
  handleDialogClose() {
    this.medicine = null
    this.displayModal = false;
    this.closeModalEvent.emit();
  }

initializeForm() {
  this.fromCreated = this.fb.group({
    medicineId: [this.medicine?.medicineId, Validators.required],
    amount: ['', Validators.required],
    ...(this.medicine?.coveragePos === false && {
      dataAdditionsRequestRequest: this.fb.group({
        numberOrder: ['', Validators.required],
        address: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      })
    })
  });
}
}
