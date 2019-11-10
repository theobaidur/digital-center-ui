import { Component, OnInit } from '@angular/core';
import { LoginData } from '../../interfaces/login-data.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Roles } from 'src/app/enums/roles.enum';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData: LoginData = {};
  processing = false;
  errorMessage = '';
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      if (user) {
        if (this.authService.hasRole(Roles.SUPER_ADMIN, Roles.ROLE_ECOMMERCE_ADMIN)) {
          this.router.navigate(['/admin']);
        } else {
          this.authService.authState.next(null);
          this.router.navigate(['/shop']);
        }
      }
    });
  }

  login() {
    this.errorMessage = '';
    this.processing = true;
    this.authService.login(this.loginData).subscribe(response => {
      this.processing = false;
    }, (err: HttpErrorResponse) => {
      if (err && err.error && err.error.errors && Array.isArray(err.error.errors)) {
        err.error.errors.map(each => {
          this.errorMessage += `<p class="text-danger">${each.detail}</p>`;
        });
      }
      this.processing = false;
    });
  }

}
