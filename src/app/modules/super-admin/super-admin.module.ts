import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { DigitalCenterAddComponent } from './components/digital-center-add/digital-center-add.component';
import { DigitalCenterEditComponent } from './components/digital-center-edit/digital-center-edit.component';
import { DigitalCenterListComponent } from './components/digital-center-list/digital-center-list.component';
import { SuperAdminPageComponent } from './pages/super-admin-page/super-admin-page.component';
import { SuperAdminHomeComponent } from './components/super-admin-home/super-admin-home.component';
import { FormsModule } from '@angular/forms';
import { PipeModule } from 'src/app/pipes/pipe.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';


@NgModule({
  declarations: [DigitalCenterAddComponent, DigitalCenterEditComponent,
    DigitalCenterListComponent, SuperAdminPageComponent, SuperAdminHomeComponent,
    CategoryAddComponent, CategoryEditComponent, CategoryListComponent, UserAddComponent,
    UserEditComponent, UserListComponent],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    FormsModule,
    PipeModule,
    ImageCropperModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule
  ]
})
export class SuperAdminModule { }
