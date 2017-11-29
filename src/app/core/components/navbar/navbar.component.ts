import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../../shared/services/user.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'core-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  locale = 'en';
  constructor(
    public authService: AuthService,
    private userService: UserService,
    private translate: TranslateService
  ) {

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en');
  }

  toggleLanguage() {
    this.locale = this.locale === 'ar' ? 'en' : 'ar';
    this.translate.use(this.locale);
  }
  getUsername(): string {
    return this.authService.getUser().name;
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }


}
