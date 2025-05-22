// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  token: string | null;
  constructor( private router: Router) {
    this.token = localStorage.getItem('token');
  }

  canActivate(): boolean {
    if (!this.token) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
