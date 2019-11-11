import { Component, OnInit } from '@angular/core';
import { Union } from 'src/app/modules/admin/models/union';
import { LocationService } from 'src/app/modules/admin/services/location.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';
import { UnionService } from 'src/app/modules/admin/services/union.service';
import { FieldError } from 'src/app/interfaces/field-error.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-union-add',
  templateUrl: './union-add.component.html',
  styleUrls: ['./union-add.component.scss']
})
export class UnionAddComponent implements OnInit {
  model: Union = {};
  processing = false;
  errors: FieldError[] = [];
  getErrors(field: string): string[] {
    return this.errors.map(error => error.detail)
    .filter(detail => !!detail)
    .map(detail => detail.split('|')).filter(parts => parts[0] === field).map(parts => parts[1]);
  }
  constructor(
    private locationService: LocationService,
    private unionService: UnionService,
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

  get upazilas() {
    return this.locationService.upazilas.getValue()
    .filter(upazila => !this.model.district_id || upazila.district_id === this.model.district_id);
  }

  submit() {
    this.errors = [];
    const data: any = {
      type: 'unions',
      attributes: {
        name: this.model.name,
        name_bn: this.model.name_bn,
        upazila_id: this.model.upazila_id
      },
      relationships: {}
    };
    if (this.model.upazila_id) {
      data.relationships.upazila = {
        data: {
          type: 'upazilas',
          id: this.model.upazila_id
        }
      };
    }
    this.aleartService.saving();
    this.unionService.post({data}).subscribe(response => {
      this.aleartService.done();
      this.router.navigate(['/super-admin/union-edit', response.id]);
    }, (err: HttpErrorResponse) => {
      if (err && err.error && err.error.errors) {
        this.errors = err.error.errors;
      }
      this.aleartService.failed();
    });
  }
}