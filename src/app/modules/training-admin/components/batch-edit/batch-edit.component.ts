import { Component, OnInit } from '@angular/core';
import { Batch } from 'src/app/modules/admin/models/batch.model';
import { BatchService } from 'src/app/modules/admin/services/batch.service';
import { FieldError } from 'src/app/interfaces/field-error.interface';
import { ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';
import { filter, map, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-batch-edit',
  templateUrl: './batch-edit.component.html',
  styleUrls: ['./batch-edit.component.scss']
})
export class BatchEditComponent implements OnInit {
  model: Batch = {};
  processing = false;
  errors: FieldError[] = [];
  getErrors(field: string): string[] {
    return this.errors.map(error => error.detail)
    .filter(detail => !!detail)
    .map(detail => detail.split('|')).filter(parts => parts[0] === field).map(parts => parts[1]);
  }
  constructor(
    private dataService: BatchService,
    private route: ActivatedRoute,
    private aleartService: SweetAlertService,
    private location: Location
  ) { }
  ngOnInit() {
    this.route.params
    .pipe(
      filter(params => !!params.id),
      map(params => params.id),
      distinctUntilChanged(),
      tap(() => this.aleartService.loading()),
      switchMap(id => this.dataService.get(id)),
      tap(() => this.aleartService.close())
    )
    .subscribe(response => {
      this.model = response;
    }, err => {
      this.aleartService.failed('Something went wrong');
      this.location.back();
    });
  }

  submit() {
    this.errors = [];
    const data: any = {
      type: 'batches',
      id: this.model.id,
      attributes: {
        title: this.model.title,
        title_bn: this.model.title_bn
      }
    };
    this.aleartService.saving();
    this.dataService.update(this.model.id, {data}).subscribe(() => {
      this.aleartService.done();
    }, (err: HttpErrorResponse) => {
      if (err && err.error && err.error.errors) {
        this.errors = err.error.errors;
      }
      this.aleartService.failed();
    });
  }
}