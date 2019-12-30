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
import { ImageCropperModule } from 'ngx-image-cropper';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
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
import { RouterModule } from '@angular/router';
import { BiggaponEditComponent } from './components/biggapon-edit/biggapon-edit.component';
import { BiggaponListComponent } from './components/biggapon-list/biggapon-list.component';
import { DigitalCenterSettingsEditComponent } from './components/digital-center-settings-edit/digital-center-settings-edit.component';
import { DigitalCenterSettingsListComponent } from './components/digital-center-settings-list/digital-center-settings-list.component';
import { GlobalSettingsEditComponent } from './components/global-settings-edit/global-settings-edit.component';
import { BiggaponAddComponent } from './components/biggapon-add/biggapon-add.component';
import { DigitalCenterSettingsAddComponent } from './components/digital-center-settings-add/digital-center-settings-add.component';
import { DeliveryAreaAddComponent } from './components/delivery-area-add/delivery-area-add.component';
import { DeliveryAreaEditComponent } from './components/delivery-area-edit/delivery-area-edit.component';
import { DeliveryAreaListComponent } from './components/delivery-area-list/delivery-area-list.component';
import { SharedComponentModule } from '../../components/shared-component.module';
import { PipeModule } from '../../pipes/pipe.module';
import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [DigitalCenterAddComponent, DigitalCenterEditComponent,
    DigitalCenterListComponent, SuperAdminPageComponent, SuperAdminHomeComponent,
    CategoryAddComponent, CategoryEditComponent, CategoryListComponent, UserAddComponent,
    UserEditComponent, UserListComponent, DivisionAddComponent, DivisionEditComponent,
    DivisionListComponent, DistrictAddComponent, DistrictEditComponent, DistrictListComponent,
    UpazilaAddComponent, UpazilaEditComponent, UpazilaListComponent, UnionAddComponent, UnionEditComponent,
     UnionListComponent, DeliveryAreaAddComponent, DeliveryAreaEditComponent, DeliveryAreaListComponent,
     BiggaponEditComponent, BiggaponListComponent, DigitalCenterSettingsEditComponent,
     DigitalCenterSettingsListComponent, GlobalSettingsEditComponent, BiggaponAddComponent, DigitalCenterSettingsAddComponent],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    SharedComponentModule,
    FormsModule,
    PipeModule,
    ImageCropperModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule,
    RouterModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline'],
          [{ color: [] }, { background: [] }],
          [{ list: 'ordered'}, { list: 'bullet' }],

        ]
      }
    })
  ]
})
export class SuperAdminModule { }
