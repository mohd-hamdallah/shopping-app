import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanActivateChild, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'shared/services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    const user = this.authService.getUser();

    const isAdmin = user ? user.isAdmin : false;

    if (!isAdmin) {
      this.router.navigate(['/home']);
    }
    return isAdmin;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(null, null);
  }
}
