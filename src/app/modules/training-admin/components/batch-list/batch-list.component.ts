import { Component, OnInit } from '@angular/core';
import { Batch } from 'src/app/modules/admin/models/batch.model';
import { BatchService } from 'src/app/modules/admin/services/batch.service';
import { AdminListPage } from 'src/app/modules/admin/components/admin-list-page.class';

@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrls: ['./batch-list.component.scss']
})
export class BatchListComponent extends AdminListPage<Batch> implements OnInit {
  ngOnInit(): void {}
  createPageLink(): string {
    return `/training-admin/batch-add`;
  }
  detailPageLink(id: string) {
    return `/training-admin/batch-edit/${id}`;
  }
  constructor(
    dataService: BatchService
  ) {
    super(dataService);
  }
}
