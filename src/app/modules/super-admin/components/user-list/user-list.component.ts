import { Component, OnInit } from '@angular/core';
import { AdminListPage } from 'src/app/modules/admin/components/admin-list-page.class';
import { User } from 'src/app/modules/admin/models/user.model';
import { AuthService } from 'src/app/modules/admin/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends AdminListPage<User> implements OnInit {
  createPageLink(): string {
    return `/super-admin/user-add`;
  }
  detailPageLink(id: string): string {
    return `/super-admin/user-edit/${id}`;
  }

  constructor(
    service: AuthService
  ) {
    super(service);
    this.defaultParams.push({
      property: 'admin_view',
      value: 1
    })
  }

  ngOnInit() {
  }

}
