import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/modules/admin/models/teacher.model';
import { AdminListPage } from 'src/app/modules/admin/components/admin-list-page.class';
import { BatchService } from 'src/app/modules/admin/services/batch.service';
import { TeacherService } from 'src/app/modules/admin/services/teacher.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent extends AdminListPage<Teacher> implements OnInit {
  ngOnInit(): void {}
  createPageLink(): string {
    return `/training-admin/teacher-add`;
  }
  detailPageLink(id: string) {
    return `/training-admin/teacher-edit/${id}`;
  }
  constructor(
    dataService: TeacherService
  ) {
    super(dataService);
  }
}
