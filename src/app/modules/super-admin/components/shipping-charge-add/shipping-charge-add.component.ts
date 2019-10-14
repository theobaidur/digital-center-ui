import { Component, OnInit } from '@angular/core';
import { ShippingCharge } from 'src/app/modules/admin/models/shipping-charge.model';
import { FieldError } from 'src/app/interfaces/field-error.interface';
import { DivisionService } from 'src/app/modules/admin/services/division.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ShippingChargeService } from 'src/app/modules/admin/services/shipping-charge.service';

@Component({
  selector: 'app-shipping-charge-add',
  templateUrl: './shipping-charge-add.component.html',
  styleUrls: ['./shipping-charge-add.component.scss']
})
export class ShippingChargeAddComponent implements OnInit {
  model: ShippingCharge = {};
  processing = false;
  errors: FieldError[] = [];
  digitalCenterId?: string;
  getErrors(field: string): string[] {
    return this.errors.map(error => error.detail)
    .filter(detail => !!detail)
    .map(detail => detail.split('|')).filter(parts => parts[0] === field).map(parts => parts[1]);
  }
  constructor(
    private shippingChargeService: ShippingChargeService,
    private router: Router,
    private route: ActivatedRoute,
    private aleartService: SweetAlertService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.digitalCenterId) {
        this.digitalCenterId = params.digitalCenterId;
      } else {
        this.router.navigate(['/super-admin/digital-center-list']);
      }
    });
  }

  submit() {
    this.errors = [];
    const data = {
      type: 'shipping-charges',
      attributes: {
        location: this.model.location,
        location_bn: this.model.location_bn,
        charge: this.model.charge,
        digital_center_id: this.digitalCenterId,
      }
    };
    this.aleartService.saving();
    this.shippingChargeService.post({data}).subscribe(response => {
      this.aleartService.done();
      this.router.navigate(['/super-admin/digital-center-edit', this.digitalCenterId]);
    }, (err: HttpErrorResponse) => {
      if (err && err.error && err.error.errors) {
        this.errors = err.error.errors;
      }
      this.aleartService.failed();
    });
  }
}
