import { UserService } from '../../../shared/services/user.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'core-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    public authService: AuthService,
    private userService: UserService
  ) { }

  getUsername(): string {
    return this.authService.getUser().name;
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }


}
