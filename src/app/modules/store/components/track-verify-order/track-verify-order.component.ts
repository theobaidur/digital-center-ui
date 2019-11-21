import { Component, OnInit, Input } from '@angular/core';
import { HttpBase } from 'src/app/services/http.service';
import { Order } from 'src/app/modules/admin/models/order.model';
import { HttpErrorResponse } from '@angular/common/http';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';

@Component({
  selector: 'app-track-verify-order',
  templateUrl: './track-verify-order.component.html',
  styleUrls: ['./track-verify-order.component.scss']
})
export class TrackVerifyOrderComponent implements OnInit {
  @Input() store: string;
  verificationCode: {code?: string, phone_or_email?: string} = {};
  order: Order;
  statuses: string[] = ['pending', 'verified', 'confirmed', 'shipped', 'paid', 'complete'];
  statusesEn: string[] = ['Waiting for Verification',
  'Order Verified', 'Order Confirmed', 'Order Delivered',
  'Payment Done', 'Order Complete'];
  statusesBn: string[] = ['ভ্যারিফিকেশনের জন্য অপেক্ষারত', 'অর্ডার ভ্যারিফিকিশন সম্পন্ন', 'অর্ডার নিশ্চিত করা হয়েছে',
   'অর্ডার ডেলিভারি হয়েছে', 'লেনদেন সম্পন্ন হয়েছে', 'অর্ডার সম্পন'];
  orderSteps: {status: boolean}[] = [];
  constructor(
    private httpService: HttpBase,
    private alertService: SweetAlertService
  ) { }

  ngOnInit() {
  }

  get steps() {
    const currentStep = this.order ? this.statuses.indexOf(this.order.status) : -1;
    return this.statuses.map((step, index) => {
      const status = index <= currentStep ? 'done' : 'progress';
      const value = this.statusesEn[index];
      // tslint:disable-next-line: variable-name
      const value_bn = this.statusesBn[index];
      return {step, status, value, value_bn};
    });
  }

  validOrderResponse(response: any) {
      if (response && response.data && (response.data as any).id) {
          return true;
      }
      return false;
  }

  verify() {
    this.alertService.saving('Verifing...');
    this.send('orders/verify');
  }

  track() {
    this.alertService.saving('Searching...');
    this.send('orders/track');
  }

  send(endpoint: string) {
    const data: any = {};
    data.type = 'orders';
    data.attributes = {phoneOrEmail: this.verificationCode.phone_or_email, code: this.verificationCode.code};
    this.httpService.post(endpoint, { data })
    .subscribe(response => {
      if (this.validOrderResponse(response)) {
        this.order = (response.data as any).attributes;
      }
      this.alertService.close();
    }, (err: HttpErrorResponse) => {
      this.alertService.failed('Order not found');
    });
  }

}
