import { AuthGaurd } from './shared/guards/auth.guard';
import { AdminGuard } from './shared/guards/admin.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from 'app/core/components/not-found/not-found.component';
import { SharedModule } from 'app/shared/shared.module';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ShoppingModule } from './shopping/shopping.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ShoppingModule,
    RouterModule.forRoot([
      {
        path: 'admin',
        loadChildren: 'app/admin/admin.module#AdminModule',
        canLoad: [AdminGuard]
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ],
      {
        enableTracing: false
      }),
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
