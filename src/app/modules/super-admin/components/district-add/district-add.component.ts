import { Component, OnInit } from '@angular/core';
import { District } from 'src/app/modules/admin/models/district.model';
import { LocationService } from 'src/app/modules/admin/services/location.service';
import { DistrictService } from 'src/app/modules/admin/services/district.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';
import { FieldError } from 'src/app/interfaces/field-error.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-district-add',
  templateUrl: './district-add.component.html',
  styleUrls: ['./district-add.component.scss']
})
export class DistrictAddComponent implements OnInit {
  errors: FieldError[] = [];
  model: District = {};
  processing = false;
  constructor(
    private locationService: LocationService,
    private districtService: DistrictService,
    private router: Router,
    private aleartService: SweetAlertService
  ) { }

  ngOnInit() {
  }

  get divisions() {
    return this.locationService.divisions.getValue();
  }

  getErrors(field: string): string[] {
    return this.errors.map(error => error.detail)
    .filter(detail => !!detail)
    .map(detail => detail.split('|')).filter(parts => parts[0] === field).map(parts => parts[1]);
  }

  submit() {
    this.errors = [];
    const data: any = {
      type: 'districts',
      attributes: {
        name: this.model.name,
        name_bn: this.model.name_bn,
        division_id: this.model.division_id
      }
    };
    this.aleartService.saving();
    this.districtService.post({data}).subscribe(response => {
      this.aleartService.done();
      this.router.navigate(['/super-admin/district-edit', response.id]);
    }, (err: HttpErrorResponse) => {
      if (err && err.error && err.error.errors) {
        this.errors = err.error.errors;
      }
      this.aleartService.failed();
    });
  }
}
