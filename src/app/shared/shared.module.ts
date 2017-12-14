import { MatTableModule } from '@angular/material/table';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { AuthGaurd } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot(),
    MatTableModule,
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
    BrowserModule,
    NgbModule,
    CustomFormsModule,
    HttpClientModule,
    MatTableModule,
    TranslateModule
  ],
  declarations: [ProductCardComponent],
  providers: [
    AuthService,
    UserService,
    CategoryService,
    ProductService,
    CustomFormsModule,
    AuthGaurd,
  ]
})
export class SharedModule { }
