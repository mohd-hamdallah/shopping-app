import { Product } from '../../models/product.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;
  @Input() hasAction = false;

  constructor() { }

  ngOnInit() {
  }

}
