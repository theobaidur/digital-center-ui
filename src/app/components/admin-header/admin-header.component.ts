import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/admin/models/user.model';
import { AuthService } from 'src/app/modules/admin/services/auth.service';
import { Roles } from 'src/app/enums/roles.enum';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  user: User;
  constructor(
    private authService: AuthService
  ) {
    this.authService.authState.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  get superAdmin() {
    return this.authService.hasRole(Roles.SUPER_ADMIN);
  }

  get ecommerceAdmin() {
    return this.authService.hasRole(Roles.ROLE_ECOMMERCE_ADMIN);
  }

}
