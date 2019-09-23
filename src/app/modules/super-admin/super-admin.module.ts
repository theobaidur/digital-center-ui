import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { DigitalCenterAddComponent } from './components/digital-center-add/digital-center-add.component';
import { DigitalCenterEditComponent } from './components/digital-center-edit/digital-center-edit.component';
import { DigitalCenterListComponent } from './components/digital-center-list/digital-center-list.component';
import { SuperAdminPageComponent } from './pages/super-admin-page/super-admin-page.component';
import { SuperAdminHomeComponent } from './components/super-admin-home/super-admin-home.component';
import { FormsModule } from '@angular/forms';
import { PipeModule } from 'src/app/pipes/pipe.module';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [DigitalCenterAddComponent, DigitalCenterEditComponent,
    DigitalCenterListComponent, SuperAdminPageComponent, SuperAdminHomeComponent],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    FormsModule,
    PipeModule,
    ImageCropperModule
  ]
})
export class SuperAdminModule { }
