import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from 'shared/services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate() {
    const result = this.authService.getUser().isAdmin;
    if (!result) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
