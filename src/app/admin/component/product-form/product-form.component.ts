import { Category } from './../../../shared/models/category.model';
import { CategoryService } from '../../../shared/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../shared/models/product.model';
import { Component, Input, OnInit } from '@angular/core';

import { ProductService } from '../../../shared/services/product.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'admin-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<Category[]>;
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productService.getById(id)
          .subscribe(p => this.product = p);
      } else {
        this.product = new Product();
      }
    });

  }

  submit() {
    if (this.product.id) {
      this.update();
    } else {
      this.add();
    }
  }

  private add(): void {
    this.productService
      .add(this.product)
      .subscribe(id => this.goToProducts());
  }

  private update(): void {
    this.productService
      .update(this.product)
      .subscribe(() => this.goToProducts());
  }

  private delete() {
    this.productService
      .delete(this.product)
      .subscribe(() => this.goToProducts());
  }

  private goToProducts(): void {
    this.router.navigateByUrl('/admin/products');
  }
}
