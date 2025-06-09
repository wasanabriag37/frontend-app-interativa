import { Component } from '@angular/core';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { RegisterUserService } from './service/register-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [AppFloatingConfigurator,  FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule, CommonModule, CardModule, PasswordModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  formRegister!: FormGroup;
  loading: boolean = false;
  ngOnInit(): void {
    this.initializeForm();
  }
  

  initializeForm(): void {
    this.formRegister = this.formBuilder.nonNullable.group({
      names: ['', [Validators.required]],
      lastNames: ['', [Validators.required]],
      numberDocument: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null],
      password:[null, [Validators.required, Validators.email]]
    });
  }

   constructor(private formBuilder: FormBuilder, private router: Router, private serviceRegister: RegisterUserService) { }


    registerUser() {
      if (!this.formRegister.valid) {
      console.log(this.formRegister.value);
      this.serviceRegister.registerUser(this.formRegister.value).subscribe({
      next: (result) => {
        this.loading = !this.loading;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Se ha guardo su registro satisfactoriamente',
          confirmButtonColor: '#3b82f6',
          confirmButtonText: 'Aceptar',
          customClass: {
            container: 'swal-over-modal'
          }
        }).then((result) => {
            this.formRegister.reset();
            this.initializeForm();
            this.router.navigate(['/auth']);
        });
      },
      error: (error) => {
        this.loading = !this.loading;
        this.formRegister.markAllAsTouched();
        Swal.fire({
          icon: 'error',
          title: '¡Algo salió mal!',
          text: 'Se ha presentado un error al registrase. ' + error.error.message,
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
  }
}
