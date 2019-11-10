import { Component, OnInit } from '@angular/core';
import { FieldError } from 'src/app/interfaces/field-error.interface';
import { Payment } from 'src/app/modules/admin/models/payment.model';
import { DigitalCenter } from 'src/app/model/digital-center.interface';
import { DigitalCenterService } from 'src/app/modules/admin/services/digital-center.service';
import { PaymentService } from 'src/app/modules/admin/services/payment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { filter, map, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-payment-edit',
  templateUrl: './payment-edit.component.html',
  styleUrls: ['./payment-edit.component.scss']
})
export class PaymentEditComponent implements OnInit {
  errors: FieldError[] = [];
  model: Payment = {};
  digitalCenters: DigitalCenter[] = [];
  processing = false;
  modes: string[] = ['Pay', 'Receive'];
  selectedMode = this.modes[0];
  constructor(
    private digitalCenterService: DigitalCenterService,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private aleartService: SweetAlertService
  ) { }

  ngOnInit() {
    this.digitalCenterService.all.subscribe(list => this.digitalCenters = list);
    this.route.params
    .pipe(
      filter(params => !!params.id),
      map(params => params.id),
      distinctUntilChanged(),
      tap(() => this.aleartService.loading()),
      switchMap(id => this.paymentService.get(id)),
      tap(() => this.aleartService.close())
    )
    .subscribe(response => {
      this.model = response;
    });
  }

  getErrors(field: string): string[] {
    return this.errors.map(error => error.detail)
    .filter(detail => !!detail)
    .map(detail => detail.split('|')).filter(parts => parts[0] === field).map(parts => parts[1]);
  }

  submit() {
    // tslint:disable-next-line: variable-name
    const paid_by = this.selectedMode.toLocaleLowerCase() === 'pay' ? 'cns' : this.model.paid_by;
    // tslint:disable-next-line: variable-name
    const paid_to = this.selectedMode.toLocaleLowerCase() === 'pay' ? this.model.paid_to : 'cns';
    this.errors = [];
    const data: any = {
      type: 'payments',
      id: this.model.id,
      attributes: {
        paid_by,
        paid_to,
        amount: this.model.amount
      }
    };
    this.aleartService.saving();
    this.paymentService.update(this.model.id, {data}).subscribe(response => {
      this.aleartService.done();
    }, (err: HttpErrorResponse) => {
      if (err && err.error && err.error.errors) {
        this.errors = err.error.errors;
      }
      this.aleartService.failed();
    });
  }
}
