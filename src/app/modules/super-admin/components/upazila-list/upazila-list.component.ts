import { Component, OnInit } from '@angular/core';
import { Upazila } from 'src/app/modules/admin/models/upazila';
import { AdminListPage } from 'src/app/modules/admin/components/admin-list-page.class';
import { UnionService } from 'src/app/modules/admin/services/union.service';
import { DivisionService } from 'src/app/modules/admin/services/division.service';
import { DistrictService } from 'src/app/modules/admin/services/district.service';
import { UpazilaService } from 'src/app/modules/admin/services/upazila.service';
import { District } from 'src/app/modules/admin/models/district.model';

@Component({
  selector: 'app-upazila-list',
  templateUrl: './upazila-list.component.html',
  styleUrls: ['./upazila-list.component.scss']
})
export class UpazilaListComponent extends AdminListPage<Upazila> implements OnInit {
  ngOnInit(): void {}
  createPageLink(): string {
    return `/super-admin/upazila-add`;
  }
  detailPageLink(id: string) {
    return `/super-admin/upazila-edit/${id}`;
  }
  constructor(
    dataService: UpazilaService,
    private divisionService: DivisionService,
    private districtService: DistrictService
  ) {
    super(dataService);
  }

  get items() {
    return this.list.map(item => {
      const district = this.districtService.fromCache(item.district_id);
      let division = {};
      if (district) {
        item.district = district;
        division = this.divisionService.fromCache(district.division_id);
      }
      if (division) {
        item.division = division;
      }
      return item;
    });
  }
}
