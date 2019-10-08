import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EcommerceAdminPageComponent } from './pages/ecommerce-admin-page/ecommerce-admin-page.component';
import { EcommerceAdminHomeComponent } from './components/ecommerce-admin-home/ecommerce-admin-home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { RoleGuard } from '../admin/guards/role.guard';
import { Role } from '../admin/enums/role.name';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { EarningListComponent } from './components/earning-list/earning-list.component';
import { AffiliateOrderListComponent } from './components/affiliate-order-list/affiliate-order-list.component';
import { HasEcommerce } from './guands/has-ecommerce.guard';
import { CanSell } from './guands/can-sell.guard';

const routes: Routes = [
  {
    path: '',
    component: EcommerceAdminPageComponent,
    canActivate: [RoleGuard, HasEcommerce],
    data: {
      roles: [Role.ROLE_ECOMMERCE_ADMIN, Role.SUPER_ADMIN]
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: EcommerceAdminHomeComponent
      },
      {
        path: 'product-list',
        component: ProductListComponent,
        canActivate: [CanSell]
      },
      {
        path: 'product-add',
        component: ProductAddComponent,
        canActivate: [CanSell]
      },
      {
        path: 'product-edit/:id',
        component: ProductEditComponent,
        canActivate: [CanSell]
      },
      {
        path: 'order-list',
        component: OrderListComponent,
        canActivate: [CanSell]
      },
      {
        path: 'affiliate-order-list',
        component: AffiliateOrderListComponent
      },
      {
        path: 'order-detail/:id',
        component: OrderDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceAdminRoutingModule { }
