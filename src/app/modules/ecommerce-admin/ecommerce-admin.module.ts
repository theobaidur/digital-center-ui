import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

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
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { EarningListComponent } from './components/earning-list/earning-list.component';
import { EarningDetailComponent } from './components/earning-detail/earning-detail.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { AffiliateOrderListComponent } from './components/affiliate-order-list/affiliate-order-list.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentAddComponent } from './components/payment-add/payment-add.component';
import { PaymentEditComponent } from './components/payment-edit/payment-edit.component';
import { DueListComponent } from './components/due-list/due-list.component';


@NgModule({
  declarations: [EcommerceAdminPageComponent, EcommerceAdminHomeComponent, ProductAddComponent,
    ProductEditComponent, ProductListComponent, OrderListComponent, OrderDetailComponent,
    EarningListComponent, EarningDetailComponent, OrderItemComponent, AffiliateOrderListComponent,
    PaymentListComponent, PaymentAddComponent, PaymentEditComponent, DueListComponent],
  imports: [
    CommonModule,
    FormsModule,
    PipeModule,
    SharedComponentModule,
    NgSelectModule,
    ImageCropperModule,
    EcommerceAdminRoutingModule,
    NgxDaterangepickerMd.forRoot()
  ]
})
export class EcommerceAdminModule {}
