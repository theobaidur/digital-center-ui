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
import { DivisionAddComponent } from './components/division-add/division-add.component';
import { DivisionListComponent } from './components/division-list/division-list.component';
import { DivisionEditComponent } from './components/division-edit/division-edit.component';
import { DistrictAddComponent } from './components/district-add/district-add.component';
import { DistrictEditComponent } from './components/district-edit/district-edit.component';
import { DistrictListComponent } from './components/district-list/district-list.component';
import { UpazilaAddComponent } from './components/upazila-add/upazila-add.component';
import { UpazilaEditComponent } from './components/upazila-edit/upazila-edit.component';
import { UpazilaListComponent } from './components/upazila-list/upazila-list.component';
import { UnionAddComponent } from './components/union-add/union-add.component';
import { UnionEditComponent } from './components/union-edit/union-edit.component';
import { UnionListComponent } from './components/union-list/union-list.component';
import { DeliveryAreaAddComponent } from './delivery-area-add/delivery-area-add.component';
import { DeliveryAreaEditComponent } from './delivery-area-edit/delivery-area-edit.component';
import { DeliveryAreaListComponent } from './delivery-area-list/delivery-area-list.component';
import { AdvertisementAddComponent } from './components/advertisement-add/advertisement-add.component';
import { AdvertisementEditComponent } from './components/advertisement-edit/advertisement-edit.component';
import { AdvertisementListComponent } from './components/advertisement-list/advertisement-list.component';
import { DigitalCenterSettingsAddComponent } from './components/digital-center-settings-add/digital-center-settings-add.component';
import { DigitalCenterSettingsEditComponent } from './components/digital-center-settings-edit/digital-center-settings-edit.component';
import { DigitalCenterSettingsListComponent } from './components/digital-center-settings-list/digital-center-settings-list.component';

export function crudUrl(prefix: string, add: any, edit: any, list: any): Routes {
  return [
    {path: `${prefix}-add`, component: add},
    {path: `${prefix}-edit/:id`, component: edit},
    {path: `${prefix}-list`, component: list},
  ];
}


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
      ...crudUrl('user', UserAddComponent, UserEditComponent, UserListComponent),
      ...crudUrl('digital-center', DigitalCenterAddComponent, DigitalCenterEditComponent, DigitalCenterListComponent),
      ...crudUrl('category', CategoryAddComponent, CategoryEditComponent, CategoryListComponent),
      ...crudUrl('division', DivisionAddComponent, DivisionEditComponent, DivisionListComponent),
      ...crudUrl('district', DistrictAddComponent, DistrictEditComponent, DistrictListComponent),
      ...crudUrl('upazila', UpazilaAddComponent, UpazilaEditComponent, UpazilaListComponent),
      ...crudUrl('union', UnionAddComponent, UnionEditComponent, UnionListComponent),
      ...crudUrl('delivery-area', DeliveryAreaAddComponent, DeliveryAreaEditComponent, DeliveryAreaListComponent),
      ...crudUrl('advertisement', AdvertisementAddComponent, AdvertisementEditComponent, AdvertisementListComponent),
      ...crudUrl('settings', DigitalCenterSettingsAddComponent, DigitalCenterSettingsEditComponent, DigitalCenterSettingsListComponent),
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
