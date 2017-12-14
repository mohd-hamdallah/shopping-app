import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'admin-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  items: MatTableDataSource<Product>;
  displayedColumns = ['title', 'price', 'edit'];

  constructor(private service: ProductService) { }

  ngOnInit() {
    this.service.getAll()
      .subscribe(products => this.items = new MatTableDataSource(products));
  }
}
