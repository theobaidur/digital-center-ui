import { Component, OnInit } from '@angular/core';
import { Division } from 'src/app/modules/admin/models/division.model';
import { AdminListPage } from 'src/app/modules/admin/components/admin-list-page.class';
import { DistrictService } from 'src/app/modules/admin/services/district.service';
import { DivisionService } from 'src/app/modules/admin/services/division.service';

@Component({
  selector: 'app-division-list',
  templateUrl: './division-list.component.html',
  styleUrls: ['./division-list.component.scss']
})
export class DivisionListComponent extends AdminListPage<Division> implements OnInit {
  ngOnInit(): void {}
  createPageLink(): string {
    return `/super-admin/division-add`;
  }
  detailPageLink(id: string) {
    return `/super-admin/division-edit/${id}`;
  }
  constructor(
    dataService: DivisionService
  ) {
    super(dataService);
  }
}

