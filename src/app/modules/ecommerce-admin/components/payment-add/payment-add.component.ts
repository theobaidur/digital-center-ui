import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/modules/admin/models/payment.model';
import { DigitalCenterService } from 'src/app/modules/admin/services/digital-center.service';
import { PaymentService } from 'src/app/modules/admin/services/payment.service';
import { FieldError } from 'src/app/interfaces/field-error.interface';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DigitalCenter } from 'src/app/model/digital-center.interface';

@Component({
  selector: 'app-payment-add',
  templateUrl: './payment-add.component.html',
  styleUrls: ['./payment-add.component.scss']
})
export class PaymentAddComponent implements OnInit {
  errors: FieldError[] = [];
  model: Payment = {};
  digitalCenters: DigitalCenter[] = [];
  processing = false;
  modes: string[] = ['Pay', 'Receive'];
  selectedMode = this.modes[0];
  constructor(
    private digitalCenterService: DigitalCenterService,
    private paymentService: PaymentService,
    private router: Router,
    private aleartService: SweetAlertService
  ) { }

  ngOnInit() {
    this.digitalCenterService.all.subscribe(list => this.digitalCenters = list);
  }

  getErrors(field: string): string[] {
    return this.errors.map(error => error.detail)
    .filter(detail => !!detail)
    .map(detail => detail.split('|')).filter(parts => parts[0] === field).map(parts => parts[1]);
  }

  submit() {
    this.errors = [];
    // tslint:disable-next-line: variable-name
    const paid_by = this.selectedMode.toLocaleLowerCase() === 'pay' ? 'cns' : this.model.paid_by;
    // tslint:disable-next-line: variable-name
    const paid_to = this.selectedMode.toLocaleLowerCase() === 'pay' ? this.model.paid_to : 'cns';
    const data: any = {
      type: 'payments',
      attributes: {
        paid_by,
        paid_to,
        amount: this.model.amount
      }
    };
    this.aleartService.saving();
    this.paymentService.post({data}).subscribe(response => {
      this.aleartService.done();
      this.router.navigate(['/super-admin/payment-edit', response.id]);
    }, (err: HttpErrorResponse) => {
      if (err && err.error && err.error.errors) {
        this.errors = err.error.errors;
      }
      this.aleartService.failed();
    });
  }
}
