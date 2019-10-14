import { Component, OnInit } from '@angular/core';
import { ShippingCharge } from 'src/app/modules/admin/models/shipping-charge.model';
import { FieldError } from 'src/app/interfaces/field-error.interface';
import { DivisionService } from 'src/app/modules/admin/services/division.service';
import { ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';
import { filter, map, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ShippingChargeService } from 'src/app/modules/admin/services/shipping-charge.service';

@Component({
  selector: 'app-shipping-charge-edit',
  templateUrl: './shipping-charge-edit.component.html',
  styleUrls: ['./shipping-charge-edit.component.scss']
})
export class ShippingChargeEditComponent implements OnInit {
  model: ShippingCharge = {};
  processing = false;
  errors: FieldError[] = [];
  getErrors(field: string): string[] {
    return this.errors.map(error => error.detail)
    .filter(detail => !!detail)
    .map(detail => detail.split('|')).filter(parts => parts[0] === field).map(parts => parts[1]);
  }
  constructor(
    private shippingChargeService: ShippingChargeService,
    private route: ActivatedRoute,
    private aleartService: SweetAlertService
  ) { }
  ngOnInit() {
    this.route.params
    .pipe(
      filter(params => !!params.id),
      map(params => params.id),
      distinctUntilChanged(),
      tap(() => this.aleartService.loading()),
      switchMap(id => this.shippingChargeService.get(id)),
      tap(() => this.aleartService.close())
    )
    .subscribe(response => {
      this.model = response;
    });
  }

  submit() {
    this.errors = [];
    const data: any = {
      id: this.model.id,
      type: 'shipping-charges',
      attributes: {
        location: this.model.location,
        location_bn: this.model.location_bn,
        charge: this.model.charge
      }
    };
    this.aleartService.saving();
    this.shippingChargeService.update(this.model.id, {data}).subscribe(() => {
      this.aleartService.done();
    }, (err: HttpErrorResponse) => {
      if (err && err.error && err.error.errors) {
        this.errors = err.error.errors;
      }
      this.aleartService.failed();
    });
  }
}
