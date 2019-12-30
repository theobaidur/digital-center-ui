import { Component, OnInit } from '@angular/core';
import { LoginData } from '../../interfaces/login-data.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Roles } from 'src/app/enums/roles.enum';
import { PasswordReset } from '../../models/password-reset.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  model: PasswordReset = {};
  processing = false;
  hasToken = false;
  tokenSent = false;
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      if (user) {
        this.router.navigate(['/admin/profile']);
      }
    });
  }

  initResetPassword() {
    this.processing = true;
    this.authService.initPasswordReset(this.model).subscribe(response => {
      this.processing = false;
      this.hasToken = true;
      this.tokenSent = true;
    }, (err) => {
      this.processing = false;
    });
  }

  resetPassword() {
    this.processing = true;
    this.authService.resetPassword(this.model).subscribe(response => {
      this.processing = false;
    }, (err) => {
      this.processing = false;
    });
  }

  submit() {
    if (this.hasToken) {
      this.resetPassword();
    } else {
      this.initResetPassword();
    }
  }

}

