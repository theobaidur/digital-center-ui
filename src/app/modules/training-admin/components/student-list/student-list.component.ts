import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/modules/admin/models/student.model';
import { StudentService } from 'src/app/modules/admin/services/student.service';
import { AdminListPage } from 'src/app/modules/admin/components/admin-list-page.class';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent extends AdminListPage<Student> implements OnInit {
  ngOnInit(): void {}
  createPageLink(): string {
    return `/training-admin/student-add`;
  }
  detailPageLink(id: string) {
    return `/training-admin/student-edit/${id}`;
  }
  constructor(
    dataService: StudentService
  ) {
    super(dataService);
  }
}
