import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'shared/models/category.model';
import { ProductsComponent } from 'shopping/components/products/products.component';


@Component({
  selector: 'shopping-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent implements OnInit {
  PARENT_ROUTE = `/${ProductsComponent.ROUTE}`;

  @Input() categories: Category[];

  constructor() {}

  ngOnInit() {
  }
}
