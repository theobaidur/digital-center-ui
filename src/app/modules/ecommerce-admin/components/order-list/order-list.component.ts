import { Component, OnInit } from '@angular/core';
import { AdminListPage } from 'src/app/modules/admin/components/admin-list-page.class';
import { Order } from 'src/app/modules/admin/models/order.model';
import { OrderService } from 'src/app/modules/admin/services/order.service';
import { AuthService } from 'src/app/modules/admin/services/auth.service';
import { Roles } from 'src/app/enums/roles.enum';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent extends AdminListPage<Order> implements OnInit {
  createPageLink() {
    return null;
  }
  detailPageLink(id: string): string {
    return `/ecommerce-admin/order-detail/${id}`;
  }

  constructor(
    service: OrderService,
    private authService: AuthService
  ) {
    super(service);
    this.authService.authState.subscribe(user => {
      if (user && this.authService.hasRole(Roles.ROLE_ECOMMERCE_ADMIN)) {
        this.defaultParams.push({
          property: 'filter[digital_center_id]',
          value: user.digital_center_id
        });
      }
    });
  }

  totalItem(order: Order) {
    if (order.items && order.items.length) {
      return order.items.length;
    }
    return 0;
  }

  total(order: Order) {
    if (order.items && order.items.length) {
      return order.items.reduce((total, current) => total + (current.quantity * current.unit_price), 0).toFixed(2);
    }
    return 0;
  }

  badgeClass(status: string) {
    switch (status) {
      case 'pending': return 'badge-primary';
      case 'complete': return 'badge-success';
      case 'confirmed': return 'badge-info';
      case 'paid': return 'badge-warning';
      case 'shipped': return 'badge-light';
      case 'verified': return 'badge-danger';
      default: return 'badge-dark';
    }
  }

  ngOnInit() {
  }

}
