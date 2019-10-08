import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/admin/services/auth.service';
import { User } from 'src/app/modules/admin/models/user.model';

@Component({
  selector: 'app-super-admin-page',
  templateUrl: './super-admin-page.component.html',
  styleUrls: ['./super-admin-page.component.scss']
})
export class SuperAdminPageComponent implements OnInit {
  user: User;
  menuItems = [
    {prefix: 'user', title: 'User'},
    {prefix: 'digital-center', title: 'Digital Center'},
    {prefix: 'category', title: 'Category'},
    {prefix: 'division', title: 'Division'},
    {prefix: 'district', title: 'District'},
    {prefix: 'upazila', title: 'Upazila'},
    {prefix: 'union', title: 'Union'},
  ];
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
