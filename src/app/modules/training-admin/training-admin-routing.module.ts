import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingAdminPageComponent } from './pages/training-admin-page/training-admin-page.component';
import { RoleGuard } from '../admin/guards/role.guard';
import { Role } from '../admin/enums/role.name';
import { TrainingHomeComponent } from './components/training-home/training-home.component';
import { CourseAddComponent } from './components/course-add/course-add.component';
import { CourseEditComponent } from './components/course-edit/course-edit.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { TeacherAddComponent } from './components/teacher-add/teacher-add.component';
import { TeacherEditComponent } from './components/teacher-edit/teacher-edit.component';
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { BatchAddComponent } from './components/batch-add/batch-add.component';
import { BatchEditComponent } from './components/batch-edit/batch-edit.component';
import { BatchListComponent } from './components/batch-list/batch-list.component';
import { RoutineAddComponent } from './components/routine-add/routine-add.component';
import { RoutineEditComponent } from './components/routine-edit/routine-edit.component';
import { RoutineListComponent } from './components/routine-list/routine-list.component';
import { AttendanceAddComponent } from './components/attendance-add/attendance-add.component';
import { AttendanceEditComponent } from './components/attendance-edit/attendance-edit.component';
import { AttendanceListComponent } from './components/attendance-list/attendance-list.component';
import { ResultAddComponent } from './components/result-add/result-add.component';
import { ResultEditComponent } from './components/result-edit/result-edit.component';
import { ResultListComponent } from './components/result-list/result-list.component';

export function crudUrl(prefix: string, add: any, edit: any, list: any): Routes {
  return [
    {path: `${prefix}-add`, component: add},
    {path: `${prefix}-edit/:id`, component: edit},
    {path: `${prefix}-list`, component: list},
  ];
}

const routes: Routes = [
  {
    path: '',
    component: TrainingAdminPageComponent,
    canActivate: [RoleGuard],
    data: {
      roles: [Role.ROLE_TRAINING_ADMIN, Role.SUPER_ADMIN]
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: TrainingHomeComponent
      },
      ...crudUrl('course', CourseAddComponent, CourseEditComponent, CourseListComponent),
      ...crudUrl('student', StudentAddComponent, StudentEditComponent, StudentListComponent),
      ...crudUrl('teacher', TeacherAddComponent, TeacherEditComponent, TeacherListComponent),
      ...crudUrl('batch', BatchAddComponent, BatchEditComponent, BatchListComponent),
      ...crudUrl('routine', RoutineAddComponent, RoutineEditComponent, RoutineListComponent),
      ...crudUrl('attendance', AttendanceAddComponent, AttendanceEditComponent, AttendanceListComponent),
      ...crudUrl('result', ResultAddComponent, ResultEditComponent, ResultListComponent),
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingAdminRoutingModule { }
