import { Component, OnInit } from '@angular/core';
import { DeliveryArea } from '../../admin/models/delivery-area.model';
import { DeliveryAreaService } from '../../admin/services/delivery-area.service';
import { FieldError } from 'src/app/interfaces/field-error.interface';
import { ActivatedRoute } from '@angular/router';
import { SweetAlertService } from '../../admin/services/sweet-alert.service';
import { filter, map, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delivery-area-edit',
  templateUrl: './delivery-area-edit.component.html',
  styleUrls: ['./delivery-area-edit.component.scss']
})
export class DeliveryAreaEditComponent implements OnInit {
  model: DeliveryArea = {};
  processing = false;
  errors: FieldError[] = [];
  getErrors(field: string): string[] {
    return this.errors.map(error => error.detail)
    .filter(detail => !!detail)
    .map(detail => detail.split('|')).filter(parts => parts[0] === field).map(parts => parts[1]);
  }
  constructor(
    private deliveryAreaService: DeliveryAreaService,
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
      switchMap(id => this.deliveryAreaService.get(id)),
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
      type: 'delivery-areas',
      attributes: {
        delivery_area: this.model.delivery_area,
        delivery_area_bn: this.model.delivery_area_bn,
        delivery_charge: this.model.delivery_charge,
        digital_center_id: this.model.digital_center_id,
      }
    };
    this.aleartService.saving();
    this.deliveryAreaService.update(this.model.id, {data}).subscribe(() => {
      this.aleartService.done();
    }, (err: HttpErrorResponse) => {
      if (err && err.error && err.error.errors) {
        this.errors = err.error.errors;
      }
      this.aleartService.failed();
    });
  }
}
