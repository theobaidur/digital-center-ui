import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/modules/admin/models/course.model';
import { CourseService } from 'src/app/modules/admin/services/course.service';
import { AdminListPage } from 'src/app/modules/admin/components/admin-list-page.class';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent extends AdminListPage<Course> implements OnInit {
  ngOnInit(): void {}
  createPageLink(): string {
    return `/training-admin/course-add`;
  }
  detailPageLink(id: string) {
    return `/training-admin/course-edit/${id}`;
  }
  constructor(
    dataService: CourseService
  ) {
    super(dataService);
  }
}
