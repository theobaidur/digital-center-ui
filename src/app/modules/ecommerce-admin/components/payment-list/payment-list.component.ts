import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/modules/admin/models/payment.model';
import { PaymentService } from 'src/app/modules/admin/services/payment.service';
import { AdminListPage } from 'src/app/modules/admin/components/admin-list-page.class';
import { AuthService } from 'src/app/modules/admin/services/auth.service';
import { Roles } from 'src/app/enums/roles.enum';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent extends AdminListPage<Payment> implements OnInit {
  createPageLink() {
    return `/ecommerce-admin/payment-add`;
  }
  detailPageLink(id: string): string {
    return `/ecommerce-admin/payment-edit/${id}`;
  }

  constructor(
    service: PaymentService,
    private authService: AuthService
  ) {
    super(service);
    this.authService.authState.subscribe(user => {
      if (user && this.authService.hasRole(Roles.ROLE_ECOMMERCE_ADMIN)) {
        this.defaultParams.push({
          property: 'filter[paid_by]',
          value: user.digital_center_id
        });
      }
      if (user && this.authService.hasRole(Roles.SUPER_ADMIN)) {
        this.defaultParams.push({
          property: 'filter[paid_by]',
          value: 'cns'
        });
      }
    });
  }

  ngOnInit() {}

}
