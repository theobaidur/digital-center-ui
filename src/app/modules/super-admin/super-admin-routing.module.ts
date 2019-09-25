import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DigitalCenterListComponent } from './components/digital-center-list/digital-center-list.component';
import { DigitalCenterAddComponent } from './components/digital-center-add/digital-center-add.component';
import { DigitalCenterEditComponent } from './components/digital-center-edit/digital-center-edit.component';
import { SuperAdminPageComponent } from './pages/super-admin-page/super-admin-page.component';
import { SuperAdminHomeComponent } from './components/super-admin-home/super-admin-home.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { Role } from '../admin/enums/role.name';
import { RoleGuard } from '../admin/guards/role.guard';


const routes: Routes = [
  {
    path: '',
    component: SuperAdminPageComponent,
    canActivate: [RoleGuard],
    data: {
      roles: [Role.SUPER_ADMIN]
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: SuperAdminHomeComponent
      },
      {
        path: 'user-list',
        component: UserListComponent
      },
      {
        path: 'user-add',
        component: UserAddComponent
      },
      {
        path: 'user-edit/:id',
        component: UserEditComponent
      }, {
        path: 'digital-center-list',
        component: DigitalCenterListComponent
      },
      {
        path: 'digital-center-add',
        component: DigitalCenterAddComponent
      },
      {
        path: 'digital-center-edit/:id',
        component: DigitalCenterEditComponent
      },
      {
        path: 'category-list',
        component: CategoryListComponent
      },
      {
        path: 'category-add',
        component: CategoryAddComponent
      },
      {
        path: 'category-edit/:id',
        component: CategoryEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
