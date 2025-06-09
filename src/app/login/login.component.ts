import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';
import { LoginServiceService } from './service/login-service.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LayoutService } from '../layout/service/layout.service';
import { AppFloatingConfigurator } from '../layout/component/app.floatingconfigurator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PasswordModule, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule, ProgressSpinnerModule, AppFloatingConfigurator],
  templateUrl: './login.component.html',
  styles: [`
    :host ::ng-deep .pi-eye,
    :host ::ng-deep .pi-eye-slash {
        transform:scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
    }
`]
})

export class LoginComponent {
  form!: FormGroup;
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.formBuilder.nonNullable.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  error: string = '';
  status: string = 'init';
  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginServiceService, public layoutService: LayoutService) { }

  doLogin() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email, password } = this.form.getRawValue();
      this.loginService.login(email, password).subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.error = error.error.message;
          this.status = 'init'
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
