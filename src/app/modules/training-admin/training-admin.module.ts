import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingAdminRoutingModule } from './training-admin-routing.module';
import { TrainingAdminPageComponent } from './pages/training-admin-page/training-admin-page.component';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { CourseAddComponent } from './components/course-add/course-add.component';
import { CourseEditComponent } from './components/course-edit/course-edit.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { BatchAddComponent } from './components/batch-add/batch-add.component';
import { BatchEditComponent } from './components/batch-edit/batch-edit.component';
import { BatchListComponent } from './components/batch-list/batch-list.component';
import { TeacherAddComponent } from './components/teacher-add/teacher-add.component';
import { TeacherEditComponent } from './components/teacher-edit/teacher-edit.component';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { AttendanceAddComponent } from './components/attendance-add/attendance-add.component';
import { AttendanceEditComponent } from './components/attendance-edit/attendance-edit.component';
import { AttendanceListComponent } from './components/attendance-list/attendance-list.component';
import { ResultAddComponent } from './components/result-add/result-add.component';
import { ResultEditComponent } from './components/result-edit/result-edit.component';
import { ResultListComponent } from './components/result-list/result-list.component';
import { RoutineAddComponent } from './components/routine-add/routine-add.component';
import { RoutineEditComponent } from './components/routine-edit/routine-edit.component';
import { RoutineListComponent } from './components/routine-list/routine-list.component';
import { TrainingHomeComponent } from './components/training-home/training-home.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedComponentModule } from 'src/app/components/shared-component.module';
import { PipeModule } from 'src/app/pipes/pipe.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';


@NgModule({
  declarations: [TrainingAdminPageComponent,
    StudentAddComponent, StudentEditComponent, StudentListComponent,
    CourseAddComponent, CourseEditComponent, CourseListComponent,
    BatchAddComponent, BatchEditComponent, BatchListComponent,
    TeacherAddComponent, TeacherEditComponent, TeacherListComponent,
    AttendanceAddComponent, AttendanceEditComponent, AttendanceListComponent,
    ResultAddComponent, ResultEditComponent, ResultListComponent,
    RoutineAddComponent, RoutineEditComponent, RoutineListComponent, TrainingHomeComponent],
  imports: [
    CommonModule,
    TrainingAdminRoutingModule,
    FormsModule,
    RouterModule,
    SharedComponentModule,
    PipeModule,
    NgxDaterangepickerMd.forRoot()
  ]
})
export class TrainingAdminModule { }
