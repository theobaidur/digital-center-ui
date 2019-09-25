import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'shop'
  },
  {
    path: 'shop',
    loadChildren: './modules/store/store.module#StoreModule'
  },
  {
    path: 'admin',
    loadChildren: './modules/admin/admin.module#AdminModule'
  },
  {
    path: 'super-admin',
    loadChildren: './modules/super-admin/super-admin.module#SuperAdminModule',
  },
  {
    path: 'ecommerce-admin',
    loadChildren: './modules/ecommerce-admin/ecommerce-admin.module#EcommerceAdminModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
