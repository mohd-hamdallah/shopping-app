import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ButtonModule, DataTableModule } from 'primeng/primeng';
import { AdminGuard } from 'shared/guards/admin.guard';
import { AuthGaurd } from 'shared/guards/auth.guard';
import { SharedModule } from 'shared/shared.module';

import { OrdersComponent } from './component/orders/orders.component';
import { ProductFormComponent } from './component/product-form/product-form.component';
import { ProductsComponent } from './component/products/products.component';

// import { DataTableModule } from 'angular-4-data-table/src/index';




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
    //  DataTableModule,
    DataTableModule,
    ButtonModule,
    NoopAnimationsModule,
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
export class AdminModule {}
