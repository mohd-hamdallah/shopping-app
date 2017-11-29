import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsComponent } from 'shopping/components/products/products.component';
import { AuthService } from 'app/shared/services/auth.service';

@Component({
  selector: 'core-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  error: boolean;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {}

  submit(email: string, password: string) {
    email = email.trim();
    password = password.trim();
    this.authService.login(email, password).subscribe(success => {
      if (success) {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        this.router.navigateByUrl(returnUrl);
      } else {
        this.error = true;
      }
    });
  }
}
