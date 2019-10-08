import { Component, OnInit } from '@angular/core';
import { District } from 'src/app/modules/admin/models/district.model';
import { LocationService } from 'src/app/modules/admin/services/location.service';
import { DistrictService } from 'src/app/modules/admin/services/district.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';

@Component({
  selector: 'app-district-add',
  templateUrl: './district-add.component.html',
  styleUrls: ['./district-add.component.scss']
})
export class DistrictAddComponent implements OnInit {
  model: District = {};
  processing = false;
  constructor(
    private locationService: LocationService,
    private districtService: DistrictService,
    private router: Router,
    private aleartService: SweetAlertService
  ) { }

  ngOnInit() {
  }

  get divisions() {
    return this.locationService.divisions.getValue();
  }

  submit() {
    const data: any = {
      type: 'districts',
      attributes: {
        name: this.model.name,
        name_bn: this.model.name_bn,
        division_id: this.model.division_id
      }
    };
    this.aleartService.saving();
    this.districtService.post({data}).subscribe(response => {
      this.aleartService.done();
      this.router.navigate(['/super-admin/district-edit', response.id]);
    }, () => this.aleartService.failed());
  }
}
