import { Component, OnInit } from '@angular/core';
import { Batch } from 'src/app/modules/admin/models/batch.model';
import { FieldError } from 'src/app/interfaces/field-error.interface';
import { BatchService } from 'src/app/modules/admin/services/batch.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-batch-add',
  templateUrl: './batch-add.component.html',
  styleUrls: ['./batch-add.component.scss']
})
export class BatchAddComponent implements OnInit {
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
    private router: Router,
    private aleartService: SweetAlertService
  ) { }

  ngOnInit() {
  }

  submit() {
    this.errors = [];
    const data = {
      type: 'batches',
      attributes: {
        title: this.model.title,
        title_bn: this.model.title_bn
      }
    };
    this.aleartService.saving();
    this.dataService.post({data}).subscribe(response => {
      this.aleartService.done();
      this.router.navigate(['/training-admin/batch-edit', response.id]);
    }, (err: HttpErrorResponse) => {
      if (err && err.error && err.error.errors) {
        this.errors = err.error.errors;
      }
      this.aleartService.failed();
    });
  }
}
