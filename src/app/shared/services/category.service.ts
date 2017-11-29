import { Category } from './../models/category.model';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'app/shared/services/auth.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { FirebaseHttpService } from 'app/shared/services/firebase-http.service';

@Injectable()
export class CategoryService extends FirebaseHttpService<Category> {
  constructor(http: Http) {
    super('categories', http);
  }

  transformFirebaseEntityToObject(init?: Partial<Category>): Category {
    return new Category(init);
  }
}
