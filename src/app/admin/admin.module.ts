import { AuthGaurd } from 'shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataTableModule } from 'angular-4-data-table/src/index';

import { AdminGuard } from 'shared/guards/admin.guard';
import { SharedModule } from 'shared/shared.module';
import { OrdersComponent } from './component/orders/orders.component';
import { ProductFormComponent } from './component/product-form/product-form.component';
import { ProductsComponent } from './component/products/products.component';


const ROUTES = [
  {
    path: '',
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
  providers: [],
  exports: []
})
export class AdminModule { }
