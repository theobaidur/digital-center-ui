import { Component, OnInit } from '@angular/core';
import { AdminListPage } from 'src/app/modules/admin/components/admin-list-page.class';
import { Earning } from 'src/app/modules/admin/models/earning.model';
import { DueService } from 'src/app/modules/admin/services/due.service';
import { Due } from '../../interfaces/due';

@Component({
  selector: 'app-due-list',
  templateUrl: './due-list.component.html',
  styleUrls: ['./due-list.component.scss']
})
export class DueListComponent extends AdminListPage<Earning> implements OnInit {
  createPageLink() {
    return null;
  }
  detailPageLink(id: string): string {
    return `/ecommerce-admin/earning-detail/${id}`;
  }

  constructor(service: DueService) {
    super(service);
  }

  remaining(item: Due) {
    if (item) {
      return ((+item.total_due) - (+item.total_paid)).toFixed(2);
    } else {
      return 0;
    }
  }

  ngOnInit() {
  }

}
