import { Component, OnInit } from '@angular/core';
import { Division } from 'src/app/modules/admin/models/division.model';
import { DivisionService } from 'src/app/modules/admin/services/division.service';
import { LocationService } from 'src/app/modules/admin/services/location.service';
import { ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';
import { filter, map, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { FieldError } from 'src/app/interfaces/field-error.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-division-edit',
  templateUrl: './division-edit.component.html',
  styleUrls: ['./division-edit.component.scss']
})
export class DivisionEditComponent implements OnInit {
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
      switchMap(id => this.divisionService.get(id)),
      tap(() => this.aleartService.close())
    )
    .subscribe(response => {
      this.model = response;
    });
  }

  submit() {
    this.errors = [];
    const data: any = {
      type: 'divisions',
      id: this.model.id,
      attributes: {
        name: this.model.name,
        name_bn: this.model.name_bn
      }
    };
    this.aleartService.saving();
    this.divisionService.update(this.model.id, {data}).subscribe(() => {
      this.aleartService.done();
    }, (err: HttpErrorResponse) => {
      if (err && err.error && err.error.errors) {
        this.errors = err.error.errors;
      }
      this.aleartService.failed();
    });
  }
}
