import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user.model';
import { LocalStorgrUtil } from './../utils/local-storge.util';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  AUTH_ENDPOINT = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBPUKGPMmaJsVMqq-KaY56Kn5TPLAKOqks';
  constructor(
    private http: Http,
    private router: Router,
    private userService: UserService
  ) {}

  login(email: string, password): Observable<boolean> {
    return this.http
      .post(this.AUTH_ENDPOINT, {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .mergeMap(response => {
        LocalStorgrUtil.set('token', response.json().idToken);

        const username = email.substring(0, email.indexOf('@'));
        return this.userService.getByUsername(username);
      })
      .map(response => {
        LocalStorgrUtil.set('user', response);
        return true;
      })
      .catch(error => {
        console.log(error);
        LocalStorgrUtil.remove('token');
        return Observable.of(false);
      });
  }

  getUser(): User {
    return LocalStorgrUtil.get('user');
  }

  isLoggedIn(): boolean {
    return LocalStorgrUtil.has('token') && LocalStorgrUtil.has('user');
  }

  isAdmin(): boolean {
    return this.isLoggedIn() && this.getUser().isAdmin;
  }

  logout() {
    LocalStorgrUtil.remove('user');
    LocalStorgrUtil.remove('token');
    this.router.navigate(['/login']);
  }
}
