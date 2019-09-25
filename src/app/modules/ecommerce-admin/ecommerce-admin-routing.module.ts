import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EcommerceAdminPageComponent } from './pages/ecommerce-admin-page/ecommerce-admin-page.component';
import { EcommerceAdminHomeComponent } from './components/ecommerce-admin-home/ecommerce-admin-home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { RoleGuard } from '../admin/guards/role.guard';
import { Role } from '../admin/enums/role.name';

const routes: Routes = [
  {
    path: '',
    component: EcommerceAdminPageComponent,
    canActivate: [RoleGuard],
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
        component: ProductListComponent
      },
      {
        path: 'product-add',
        component: ProductAddComponent
      },
      {
        path: 'product-edit/:id',
        component: ProductEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceAdminRoutingModule { }
