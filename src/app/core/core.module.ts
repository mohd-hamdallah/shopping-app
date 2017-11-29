import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { NotFoundComponent } from 'app/core/components/not-found/not-found.component';
import { SharedModule } from 'app/shared/shared.module';

import { HomeComponent } from './components/home/home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthGaurd } from 'shared/guards/auth.guard';

export const ROUTES: Route[] = [
      {
        path: 'login',
        component: LoginFormComponent
      },
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGaurd]
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ];

@NgModule({
  declarations: [
    LoginFormComponent,
    NavbarComponent,
    NotFoundComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [NavbarComponent]
})
export class CoreModule {}
