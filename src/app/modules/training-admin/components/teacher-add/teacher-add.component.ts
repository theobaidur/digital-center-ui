import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/modules/admin/models/teacher.model';
import { TeacherService } from 'src/app/modules/admin/services/teacher.service';
import { FieldError } from 'src/app/interfaces/field-error.interface';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-teacher-add',
  templateUrl: './teacher-add.component.html',
  styleUrls: ['./teacher-add.component.scss']
})
export class TeacherAddComponent implements OnInit {
  model: Teacher = {};
  processing = false;
  errors: FieldError[] = [];
  getErrors(field: string): string[] {
    return this.errors.map(error => error.detail)
    .filter(detail => !!detail)
    .map(detail => detail.split('|')).filter(parts => parts[0] === field).map(parts => parts[1]);
  }
  constructor(
    private dataService: TeacherService,
    private router: Router,
    private aleartService: SweetAlertService
  ) { }

  ngOnInit() {
  }

  submit() {
    this.errors = [];
    const data = {
      type: 'teachers',
      attributes: {
        name: this.model.name,
        name_bn: this.model.name_bn
      }
    };
    this.aleartService.saving();
    this.dataService.post({data}).subscribe(response => {
      this.aleartService.done();
      this.router.navigate(['/training-admin/teacher-edit', response.id]);
    }, (err: HttpErrorResponse) => {
      if (err && err.error && err.error.errors) {
        this.errors = err.error.errors;
      }
      this.aleartService.failed();
    });
  }
}
