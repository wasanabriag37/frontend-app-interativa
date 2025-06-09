import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { TokenServiceService } from '../login/service/token-service.service';
import { MessageService } from 'primeng/api';

export const authorizationPermissionsGuard: CanActivateFn = (permisos: ActivatedRouteSnapshot): boolean => {
  // const permisosUser = inject(TokenServiceService).getRoles();
  // const messageService = inject(MessageService);
  // const router = inject(Router);
  // if (!Array.isArray(permisosUser) || !Object.values(permisos.data).some(permiso => permisosUser.includes(permiso))) {
  //   setTimeout(() => {
  //     messageService.add({
  //       severity: 'warn',
  //       summary: 'Acceso denegado',
  //       detail: 'No tienes permisos suficientes para acceder a este enlace.',
  //       life: 6000,
  //     });
  //     router.navigate(['/home']);
  //   }, 300);
  //   return false;
  // }
  return true;
};
