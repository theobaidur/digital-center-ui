import { Component, OnInit } from '@angular/core';
import { Upazila } from 'src/app/modules/admin/models/upazila';
import { UpazilaService } from 'src/app/modules/admin/services/upazila.service';
import { LocationService } from 'src/app/modules/admin/services/location.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';
import { FieldError } from 'src/app/interfaces/field-error.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-upazila-add',
  templateUrl: './upazila-add.component.html',
  styleUrls: ['./upazila-add.component.scss']
})
export class UpazilaAddComponent implements OnInit {
  model: Upazila = {};
  processing = false;
  errors: FieldError[] = [];
  getErrors(field: string): string[] {
    return this.errors.map(error => error.detail)
    .filter(detail => !!detail)
    .map(detail => detail.split('|')).filter(parts => parts[0] === field).map(parts => parts[1]);
  }
  constructor(
    private locationService: LocationService,
    private upazilaService: UpazilaService,
    private router: Router,
    private aleartService: SweetAlertService
  ) { }

  ngOnInit() {
  }

  get divisions() {
    return this.locationService.divisions.getValue();
  }

  get districts() {
    return this.locationService.districts.getValue()
    .filter(district => !this.model.division_id || district.division_id === this.model.division_id);
  }

  submit() {
    this.errors = [];
    const data: any = {
      type: 'upazilas',
      attributes: {
        name: this.model.name,
        name_bn: this.model.name_bn,
        district_id: this.model.district_id
      }
    };
    this.aleartService.saving();
    this.upazilaService.post({data}).subscribe(response => {
      this.aleartService.done();
      this.router.navigate(['/super-admin/upazila-edit', response.id]);
    }, (err: HttpErrorResponse) => {
      if (err && err.error && err.error.errors) {
        this.errors = err.error.errors;
      }
      this.aleartService.failed();
    });
  }
}
