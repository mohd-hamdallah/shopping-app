import { Category } from './../models/category.model';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'app/shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseHttpService } from 'app/shared/services/firebase-http.service';

@Injectable()
export class CategoryService extends FirebaseHttpService<Category> {
  constructor(http: HttpClient) {
    super('categories', http);
  }

  transformFirebaseEntityToObject(init?: Partial<Category>): Category {
    return new Category(init);
  }
}
