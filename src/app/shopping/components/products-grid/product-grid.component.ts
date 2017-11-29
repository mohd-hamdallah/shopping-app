import { Product } from '../../../shared/models/product.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shopping-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {
  @Input() products: Product[];

  constructor() { }

  ngOnInit() {
  }

}
