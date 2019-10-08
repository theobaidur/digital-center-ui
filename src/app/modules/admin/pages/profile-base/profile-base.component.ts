import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Roles } from 'src/app/enums/roles.enum';

@Component({
  selector: 'app-profile-base',
  templateUrl: './profile-base.component.html',
  styleUrls: ['./profile-base.component.scss']
})
export class ProfileBaseComponent implements OnInit {
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
