import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './../models/user.model';
import { FirebaseHttpService } from './firebase-http.service';

@Injectable()
export class UserService extends FirebaseHttpService<User> {
  constructor(http: HttpClient) {
    super('users', http);
  }

  transformFirebaseEntityToObject(init?: Partial<User>): User {
    return new User(init);
  }

  getByUsername(username: string) {
    return this.getById(username);
  }
}
