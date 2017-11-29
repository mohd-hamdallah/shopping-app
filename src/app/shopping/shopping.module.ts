import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ProductsComponent } from 'app/shopping/components/products/products.component';

import { AuthGaurd } from '../shared/guards/auth.guard';
import { SharedModule } from './../shared/shared.module';
import { ProductsFilterComponent } from './components/products-filter/products-filter.component';
import { ProductGridComponent } from './components/products-grid/product-grid.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

const ROUTES: Route[] = [
  {
    path: ProductsComponent.ROUTE,
    component: ProductsComponent,
    canActivate: [AuthGaurd]
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
    canActivate: [AuthGaurd]
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    ProductsComponent,
    ProductGridComponent,
    ShoppingCartComponent,
    ProductsFilterComponent
  ]
})
export class ShoppingModule {}
