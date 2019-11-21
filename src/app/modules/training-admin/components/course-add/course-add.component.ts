import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/modules/admin/models/course.model';
import { CourseService } from 'src/app/modules/admin/services/course.service';
import { FieldError } from 'src/app/interfaces/field-error.interface';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent implements OnInit {
  model: Course = {};
  processing = false;
  errors: FieldError[] = [];
  getErrors(field: string): string[] {
    return this.errors.map(error => error.detail)
    .filter(detail => !!detail)
    .map(detail => detail.split('|')).filter(parts => parts[0] === field).map(parts => parts[1]);
  }
  constructor(
    private dataService: CourseService,
    private router: Router,
    private aleartService: SweetAlertService
  ) { }

  ngOnInit() {
  }

  submit() {
    this.errors = [];
    const data = {
      type: 'courses',
      attributes: {
        title: this.model.title,
        title_bn: this.model.title_bn
      }
    };
    this.aleartService.saving();
    this.dataService.post({data}).subscribe(response => {
      this.aleartService.done();
      this.router.navigate(['/training-admin/course-edit', response.id]);
    }, (err: HttpErrorResponse) => {
      if (err && err.error && err.error.errors) {
        this.errors = err.error.errors;
      }
      this.aleartService.failed();
    });
  }
}
