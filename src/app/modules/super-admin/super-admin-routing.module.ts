import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DigitalCenterListComponent } from './components/digital-center-list/digital-center-list.component';
import { DigitalCenterAddComponent } from './components/digital-center-add/digital-center-add.component';
import { DigitalCenterEditComponent } from './components/digital-center-edit/digital-center-edit.component';
import { SuperAdminPageComponent } from './pages/super-admin-page/super-admin-page.component';
import { SuperAdminHomeComponent } from './components/super-admin-home/super-admin-home.component';


const routes: Routes = [
  {
    path: '',
    component: SuperAdminPageComponent,
    // pathMatch: 'full',
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
