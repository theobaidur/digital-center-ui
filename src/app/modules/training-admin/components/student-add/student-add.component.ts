import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/modules/admin/models/student.model';
import { FieldError } from 'src/app/interfaces/field-error.interface';
import { BatchService } from 'src/app/modules/admin/services/batch.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StudentService } from 'src/app/modules/admin/services/student.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss']
})
export class StudentAddComponent implements OnInit {
  model: Student = {};
  processing = false;
  errors: FieldError[] = [];
  getErrors(field: string): string[] {
    return this.errors.map(error => error.detail)
    .filter(detail => !!detail)
    .map(detail => detail.split('|')).filter(parts => parts[0] === field).map(parts => parts[1]);
  }
  constructor(
    private dataService: StudentService,
    private router: Router,
    private aleartService: SweetAlertService
  ) { }

  ngOnInit() {
  }

  submit() {
    this.errors = [];
    const data = {
      type: 'students',
      attributes: {
        name: this.model.name,
        name_bn: this.model.name_bn
      }
    };
    this.aleartService.saving();
    this.dataService.post({data}).subscribe(response => {
      this.aleartService.done();
      this.router.navigate(['/training-admin/student-edit', response.id]);
    }, (err: HttpErrorResponse) => {
      if (err && err.error && err.error.errors) {
        this.errors = err.error.errors;
      }
      this.aleartService.failed();
    });
  }
}
