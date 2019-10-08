import { Component, OnInit } from '@angular/core';
import { AdminListPage } from 'src/app/modules/admin/components/admin-list-page.class';
import { DigitalCenter } from 'src/app/model/digital-center.interface';
import { DigitalCenterService } from 'src/app/modules/admin/services/digital-center.service';
import { UnionService } from 'src/app/modules/admin/services/union.service';
import { Union } from 'src/app/modules/admin/models/union';
import { DivisionService } from 'src/app/modules/admin/services/division.service';
import { DistrictService } from 'src/app/modules/admin/services/district.service';
import { Upazila } from 'src/app/modules/admin/models/upazila';
import { UpazilaService } from 'src/app/modules/admin/services/upazila.service';
import { District } from 'src/app/modules/admin/models/district.model';

@Component({
  selector: 'app-union-list',
  templateUrl: './union-list.component.html',
  styleUrls: ['./union-list.component.scss']
})
export class UnionListComponent extends AdminListPage<Union> implements OnInit {
  ngOnInit(): void {}
  createPageLink(): string {
    return `/super-admin/union-add`;
  }
  detailPageLink(id: string) {
    return `/super-admin/union-edit/${id}`;
  }
  constructor(
    dataService: UnionService,
    private divisionService: DivisionService,
    private districtService: DistrictService,
    private upazilaService: UpazilaService
  ) {
    super(dataService);
  }

  get items() {
    return this.list.map(item => {
      const upazila = this.upazilaService.fromCache(item.upazila_id);
      let district: District = {};
      if (upazila) {
        district = this.districtService.fromCache(upazila.district_id);
        item.upazila = upazila;
      }
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
