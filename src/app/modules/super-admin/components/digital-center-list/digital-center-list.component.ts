import { Component, OnInit } from '@angular/core';
import { DigitalCenter } from 'src/app/model/digital-center.interface';
import { AdminListPage } from 'src/app/modules/admin/components/admin-list-page.class';
import { DigitalCenterService } from 'src/app/modules/admin/services/digital-center.service';

@Component({
  selector: 'app-digital-center-list',
  templateUrl: './digital-center-list.component.html',
  styleUrls: ['./digital-center-list.component.scss']
})
export class DigitalCenterListComponent extends AdminListPage<DigitalCenter> implements OnInit {
  ngOnInit(): void {}
  createPageLink(): string {
    return `/super-admin/digital-center-add`;
  }
  detailPageLink(id: string) {
    return `/super-admin/digital-center-edit/${id}`;
  }
  constructor(
    dataService: DigitalCenterService
  ) {
    super(dataService);
  }
}
