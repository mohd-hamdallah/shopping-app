import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataTableModule } from 'angular-4-data-table/src/index';

import { AuthGaurd } from '../shared/guards/auth.guard';
import { SharedModule } from './../shared/shared.module';
import { OrdersComponent } from './component/orders/orders.component';
import { ProductFormComponent } from './component/product-form/product-form.component';
import { ProductsComponent } from './component/products/products.component';
import { AdminGuard } from './guards/admin.guard';

const ROUTES = [
  {
    path: 'admin',
    canActivateChild: [AuthGaurd, AdminGuard],
    children: [

      {
        path: 'orders',
        component: OrdersComponent
      },

      {
        path: 'products',
        children: [
          {
            path: '',
            component: ProductsComponent,
          },
          {
            path: 'add',
            component: ProductFormComponent
          },
          {
            path: ':id',
            component: ProductFormComponent
          }
        ]
      }

    ]
  }
];

@NgModule({
  imports: [
    SharedModule,
    DataTableModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [
    OrdersComponent,
    ProductsComponent,
    ProductFormComponent
  ],
  providers: [AdminGuard],
  exports: []
})
export class AdminModule { }
