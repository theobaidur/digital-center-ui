import { LanguageService } from 'src/app/services/language.service';
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/modules/admin/models/student.model';
import { StudentService } from 'src/app/modules/admin/services/student.service';
import { AdminListPage } from 'src/app/modules/admin/components/admin-list-page.class';
import { BatchService } from '../../../admin/services/batch.service';

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

  batches(student: Student){
    const lang = this.langService.language.value.toLowerCase();
    const prop = lang === 'bn' ? 'title_bn' : 'title';
    return (student.batches || []).map(b=>b[prop] || b.title).join(',');
  }

  constructor(
    dataService: StudentService,
    batchService: BatchService,
    private langService: LanguageService
  ) {
    super(dataService);
    this.defaultParams.push({
      property: 'include',
      value: 'batches'
    });
  }
}
