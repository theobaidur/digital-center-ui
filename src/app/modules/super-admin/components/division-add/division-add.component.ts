import { Component, OnInit } from '@angular/core';
import { Division } from 'src/app/modules/admin/models/division.model';
import { DivisionService } from 'src/app/modules/admin/services/division.service';
import { LocationService } from 'src/app/modules/admin/services/location.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FieldError } from 'src/app/interfaces/field-error.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-division-add',
  templateUrl: './division-add.component.html',
  styleUrls: ['./division-add.component.scss']
})
export class DivisionAddComponent implements OnInit {
  model: Division = {};
  processing = false;
  errors: FieldError[] = [];
  getErrors(field: string): string[] {
    return this.errors.map(error => error.detail)
    .filter(detail => !!detail)
    .map(detail => detail.split('|')).filter(parts => parts[0] === field).map(parts => parts[1]);
  }
  constructor(
    private divisionService: DivisionService,
    private router: Router,
    private aleartService: SweetAlertService
  ) { }

  ngOnInit() {
  }

  submit() {
    this.errors = [];
    const data = {
      type: 'divisions',
      attributes: {
        name: this.model.name,
        name_bn: this.model.name_bn
      }
    };
    this.aleartService.saving();
    this.divisionService.post({data}).subscribe(response => {
      this.aleartService.done();
      this.router.navigate(['/super-admin/division-edit', response.id]);
    }, (err: HttpErrorResponse) => {
      if (err && err.error && err.error.errors) {
        this.errors = err.error.errors;
      }
      this.aleartService.failed();
    });
  }
}
