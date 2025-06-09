import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { JwtPayload } from '../models/authModel'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {

  constructor(private router: Router) { }

  savetoken(token: string) {
    setCookie('token', token);
  }

  getToken() {
    const token = getCookie('token');
    return token;
  }

  getUser() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const nombres = jwtDecode<JwtPayload>(token).user.names + " " + jwtDecode<JwtPayload>(token).user.lastNames;
     return nombres.replace(/\b\w/g, char => char.toUpperCase());
  }

  getUserId() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const id = jwtDecode<JwtPayload>(token).user.userId
    return id;
  }

  // getRoles() {
  //   const token = this.getToken();
  //   if (!token) {
  //     return false;
  //   }
  //   const roles = jwtDecode<JwtPayload>(token).user.permissions;
  //   return roles.map(role => role.name);
  // }

  isValidToken(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    try {
      const tokenData = jwtDecode<JwtPayload>(token);
      if (tokenData?.exp) {
        const expirationTime = tokenData.exp * 1000;
        return Date.now() < expirationTime;
      }
      return false;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return false;
    }
  }

  logout() {
    removeCookie('token');
    this.router.navigate(['/']);
  }

  // hasPermiso(permisos: Array<string>): boolean {
  //   const roles = this.getRoles()
  //   if (!this.isValidToken() || !this.getToken() ||
  //     (!Array.isArray(roles) || !permisos.some(permiso => roles.includes(permiso)))) {
  //     return false;
  //   }
  //   return true;
  // }

  getEmail() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    return jwtDecode<JwtPayload>(token).user.email
  }
}
