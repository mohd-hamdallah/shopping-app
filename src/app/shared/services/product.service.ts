import { Http } from '@angular/http';
import { AuthService } from 'app/shared/services/auth.service';
import { Injectable } from '@angular/core';
import { FirebaseHttpService } from 'app/shared/services/firebase-http.service';
import { Product } from 'app/shared/models/product.model';
import { Category } from 'app/shared/models/category.model';

@Injectable()
export class ProductService extends FirebaseHttpService<Product> {

  constructor(http: Http) {
    super('products', http);
  }

  transformFirebaseEntityToObject(init?: Partial<Product>): Product {
    return new Product(init);
  }

  transformObjectToFirebaseEntity(p: Product) {
    return {
      title: p.title,
      price: p.price,
      category: p.category,
      imageUrl: p.imageUrl
    };
  }

  getAllByCategory(categoryKey: string) {
    return this.getAllByProperty('category', categoryKey);
  }

}
