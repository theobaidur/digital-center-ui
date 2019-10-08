import { Component, OnInit } from '@angular/core';
import { District } from 'src/app/modules/admin/models/district.model';
import { DistrictService } from 'src/app/modules/admin/services/district.service';
import { AdminListPage } from 'src/app/modules/admin/components/admin-list-page.class';
import { DivisionService } from 'src/app/modules/admin/services/division.service';

@Component({
  selector: 'app-district-list',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.scss']
})
export class DistrictListComponent extends AdminListPage<District> implements OnInit {
  ngOnInit(): void {}
  createPageLink(): string {
    return `/super-admin/district-add`;
  }
  detailPageLink(id: string) {
    return `/super-admin/district-edit/${id}`;
  }
  constructor(
    dataService: DistrictService,
    private divisionService: DivisionService
  ) {
    super(dataService);
  }

  get items() {
    return this.list.map(item => {
      const division = this.divisionService.fromCache(item.division_id);
      if (division) {
        item.division = division;
      }
      return item;
    });
  }
}
