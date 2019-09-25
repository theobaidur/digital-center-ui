import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcommerceAdminRoutingModule } from './ecommerce-admin-routing.module';
import { EcommerceAdminPageComponent } from './pages/ecommerce-admin-page/ecommerce-admin-page.component';
import { EcommerceAdminHomeComponent } from './components/ecommerce-admin-home/ecommerce-admin-home.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PipeModule } from 'src/app/pipes/pipe.module';
import { SharedComponentModule } from 'src/app/components/shared-component.module';


@NgModule({
  declarations: [EcommerceAdminPageComponent, EcommerceAdminHomeComponent, ProductAddComponent, ProductEditComponent, ProductListComponent],
  imports: [
    CommonModule,
    FormsModule,
    PipeModule,
    SharedComponentModule,
    NgSelectModule,
    ImageCropperModule,
    EcommerceAdminRoutingModule
  ]
})
export class EcommerceAdminModule { }
