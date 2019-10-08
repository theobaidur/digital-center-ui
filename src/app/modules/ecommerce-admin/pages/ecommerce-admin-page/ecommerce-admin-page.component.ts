import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/admin/models/user.model';
import { AuthService } from 'src/app/modules/admin/services/auth.service';
import { map, tap } from 'rxjs/operators';
import { Roles } from 'src/app/enums/roles.enum';

@Component({
  selector: 'app-ecommerce-admin-page',
  templateUrl: './ecommerce-admin-page.component.html',
  styleUrls: ['./ecommerce-admin-page.component.scss']
})
export class EcommerceAdminPageComponent implements OnInit {
  user: User;
  constructor(
    private authService: AuthService
  ) {
    this.authService.authState.subscribe(user => this.user = user);
  }

  get canSell() {
    return this.user && this.user.digital_center && this.user.digital_center.has_shop && !this.user.digital_center.shop_affiliate_only;
  }

  get isSuperAdmin() {
    return this.authService.hasRole(Roles.SUPER_ADMIN);
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
