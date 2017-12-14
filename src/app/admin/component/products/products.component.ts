import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';

import { DataTableModule, SharedModule } from 'primeng/primeng';

@Component({
  selector: 'admin-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  items: any[] = [];
  products: Product[];
  itemCount: number;
  // itemResource: DataTableResource<any>;
  constructor(private service: ProductService) { }

  ngOnInit() {
    this.service.getAll().subscribe(response => {
      this.products = response;
      // this.itemResource = new DataTableResource(response);
      // this.itemResource.count().then(count => (this.itemCount = count));
    });
  }

  reloadItems(params) {
    // this.itemResource.query(params).then(items => (this.items = items));
  }
}
