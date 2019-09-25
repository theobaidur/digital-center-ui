import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/admin/models/user.model';
import { AuthService } from 'src/app/modules/admin/services/auth.service';

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

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
