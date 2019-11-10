import { Component, OnInit } from '@angular/core';
import { EarningService } from 'src/app/modules/admin/services/earning.service';
import { EarningType, Earning } from 'src/app/modules/admin/models/earning.model';
import { AdminListPage } from 'src/app/modules/admin/components/admin-list-page.class';
import { Order } from 'src/app/modules/admin/models/order.model';
import { AuthService } from 'src/app/modules/admin/services/auth.service';
import { Roles } from 'src/app/enums/roles.enum';

@Component({
  selector: 'app-earning-list',
  templateUrl: './earning-list.component.html',
  styleUrls: ['./earning-list.component.scss']
})
export class EarningListComponent extends AdminListPage<Earning> implements OnInit {
  createPageLink() {
    return null;
  }
  detailPageLink(id: string): string {
    return `/ecommerce-admin/earning-detail/${id}`;
  }

  constructor(
    service: EarningService,
    private authService: AuthService
  ) {
    super(service);
    this.authService.authState.subscribe(user => {
      if (user && this.authService.hasRole(Roles.ROLE_ECOMMERCE_ADMIN)) {
        this.defaultParams.push({
          property: 'filter[earned_by]',
          value: user.digital_center_id
        });
      }
      if (user && this.authService.hasRole(Roles.SUPER_ADMIN)) {
        this.defaultParams.push({
          property: 'filter[earned_by]',
          value: 'cns'
        });
      }
    });
  }

  ngOnInit() {
  }

}
