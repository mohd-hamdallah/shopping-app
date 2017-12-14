import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CustomFormsModule } from 'ng2-validation';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGaurd } from './guards/auth.guard';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }

    )
  ],
  exports: [
    ProductCardComponent,
    FormsModule,
    NgbModule,
    CustomFormsModule,
    CommonModule,
    HttpClientModule,
    TranslateModule
  ],
  declarations: [ProductCardComponent]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService,
        UserService,
        CategoryService,
        ProductService,
        CustomFormsModule,
        AuthGaurd,
        AdminGuard,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    };
  }

}
