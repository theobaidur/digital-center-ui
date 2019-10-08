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
import { SharedComponentModule } from 'src/app/components/shared-component.module';
import { DivisionAddComponent } from './components/division-add/division-add.component';
import { DivisionEditComponent } from './components/division-edit/division-edit.component';
import { DivisionListComponent } from './components/division-list/division-list.component';
import { DistrictAddComponent } from './components/district-add/district-add.component';
import { DistrictEditComponent } from './components/district-edit/district-edit.component';
import { DistrictListComponent } from './components/district-list/district-list.component';
import { UpazilaAddComponent } from './components/upazila-add/upazila-add.component';
import { UpazilaEditComponent } from './components/upazila-edit/upazila-edit.component';
import { UpazilaListComponent } from './components/upazila-list/upazila-list.component';
import { UnionAddComponent } from './components/union-add/union-add.component';
import { UnionEditComponent } from './components/union-edit/union-edit.component';
import { UnionListComponent } from './components/union-list/union-list.component';


@NgModule({
  declarations: [DigitalCenterAddComponent, DigitalCenterEditComponent,
    DigitalCenterListComponent, SuperAdminPageComponent, SuperAdminHomeComponent,
    CategoryAddComponent, CategoryEditComponent, CategoryListComponent, UserAddComponent,
    UserEditComponent, UserListComponent, DivisionAddComponent, DivisionEditComponent, DivisionListComponent, DistrictAddComponent, DistrictEditComponent, DistrictListComponent, UpazilaAddComponent, UpazilaEditComponent, UpazilaListComponent, UnionAddComponent, UnionEditComponent, UnionListComponent],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    SharedComponentModule,
    FormsModule,
    PipeModule,
    ImageCropperModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule
  ]
})
export class SuperAdminModule { }
