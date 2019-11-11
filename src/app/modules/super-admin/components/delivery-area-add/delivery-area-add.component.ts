import { Component, OnInit } from '@angular/core';
import { DeliveryArea } from '../../../admin/models/delivery-area.model';
import { FieldError } from 'src/app/interfaces/field-error.interface';
import { DeliveryAreaService } from '../../../admin/services/delivery-area.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetAlertService } from '../../../admin/services/sweet-alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delivery-area-add',
  templateUrl: './delivery-area-add.component.html',
  styleUrls: ['./delivery-area-add.component.scss']
})
export class DeliveryAreaAddComponent implements OnInit {
  model: DeliveryArea = {};
  processing = false;
  errors: FieldError[] = [];
  digitalCenterId?: string;
  getErrors(field: string): string[] {
    return this.errors.map(error => error.detail)
    .filter(detail => !!detail)
    .map(detail => detail.split('|')).filter(parts => parts[0] === field).map(parts => parts[1]);
  }
  constructor(
    private deliveryAreaService: DeliveryAreaService,
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
      type: 'delivery-areas',
      attributes: {
        delivery_area: this.model.delivery_area,
        delivery_area_bn: this.model.delivery_area_bn,
        delivery_charge: this.model.delivery_charge,
        digital_center_id: this.digitalCenterId,
      }
    };
    this.aleartService.saving();
    this.deliveryAreaService.post({data}).subscribe(response => {
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
