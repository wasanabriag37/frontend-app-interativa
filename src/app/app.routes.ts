import { Routes } from '@angular/router';
import { AppLayout } from './layout/component/app.layout';
import { redirectGuardGuard } from './guards/redirect-guard.guard';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './core/register/register.component';
import { MedicineComponent } from './core/medicine/medicine.component';
import { RequestMedicineListComponent } from './core/requestMedicine/request-medicine-list/request-medicine-list.component';



export const appRoutes: Routes = [
    { path: '', component: LandingPageComponent, canActivate: [redirectGuardGuard] },

    { path: 'auth', component: LoginComponent, canActivate: [redirectGuardGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [redirectGuardGuard] },
    {
        path: 'home',
        component: AppLayout, canActivate: [authGuard],
        children: [
            { path: 'requestMedicine', component: MedicineComponent, canActivate: [authGuard]},
            { path: 'requestMedicineList', component: RequestMedicineListComponent, canActivate: [authGuard]},

        ]
        
    },
];
