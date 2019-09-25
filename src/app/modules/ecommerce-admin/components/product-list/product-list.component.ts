import { Component, OnInit } from '@angular/core';
import { AdminListPage } from 'src/app/modules/admin/components/admin-list-page.class';
import { Product } from 'src/app/modules/admin/models/product.model';
import { ProductService } from 'src/app/modules/admin/services/product.service';
import { RequestParam } from 'src/app/interfaces/request-param.interface';
import { AuthService } from 'src/app/modules/admin/services/auth.service';
import { Roles } from 'src/app/enums/roles.enum';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends AdminListPage<Product> implements OnInit {
  createPageLink(): string {
    return `/ecommerce-admin/product-add`;
  }
  detailPageLink(id: string): string {
    return `/ecommerce-admin/product-edit/${id}`;
  }

  constructor(
    service: ProductService,
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

  canDelete(product: Product) {
    if (this.authService.hasRole(Roles.ROLE_ECOMMERCE_ADMIN) && this.authService.isAdminOf(product.digital_center_id)) {
      return true;
    }
    if (this.authService.hasRole(Roles.SUPER_ADMIN)) {
      return true;
    }
    return false;
  }

  ngOnInit() {
  }

}
