import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'app/shared/models/category.model';
import { CategoryService } from 'app/shared/services/category.service';
import { Observable } from 'rxjs/Observable';

import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../../../shared/services/product.service';


@Component({
  selector: 'shopping-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  static ROUTE = 'products';

  categories$: Observable<Category[]>;
  products: Product[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    translate: TranslateService
  ) {

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('ar');
  }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();

    this.route.queryParamMap.subscribe(queryParams =>
      this.populateProducts(queryParams.get('category'))
    );
  }

  populateProducts(categoryParam): void {
    if (categoryParam) {
      this.productService.getAllByCategory(categoryParam)
        .subscribe(products => this.products = products);
    } else {
      this.productService.getAll()
        .subscribe(ps => this.products = ps);
    }
  }
}
