import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Auth } from '../auth.service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private service: Auth, private router: Router) {}

  canActivate() {
    if (!this.service.authenticated()) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
