import { Component, OnInit } from '@angular/core';
import { District } from 'src/app/modules/admin/models/district.model';
import { DistrictService } from 'src/app/modules/admin/services/district.service';
import { Subject, of } from 'rxjs';
import { LocationService } from 'src/app/modules/admin/services/location.service';
import { ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';
import { filter, switchMap, map, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-district-edit',
  templateUrl: './district-edit.component.html',
  styleUrls: ['./district-edit.component.scss']
})
export class DistrictEditComponent implements OnInit {
  model: District = {};
  processing = false;
  constructor(
    private locationService: LocationService,
    private districtService: DistrictService,
    private route: ActivatedRoute,
    private aleartService: SweetAlertService
  ) { }
  ngOnInit() {
    this.route.params
    .pipe(
      filter(params => !!params.id),
      map(params => params.id),
      distinctUntilChanged(),
      tap(() => this.aleartService.loading()),
      switchMap(id => this.districtService.get(id)),
      tap(() => this.aleartService.close())
    )
    .subscribe(response => {
      this.model = response;
    });
  }

  get divisions() {
    return this.locationService.divisions.getValue();
  }

  submit() {
    const data: any = {
      type: 'districts',
      id: this.model.id,
      attributes: {
        name: this.model.name,
        name_bn: this.model.name_bn,
        division_id: this.model.division_id
      }
    };
    this.aleartService.saving();
    this.districtService.update(this.model.id, {data}).subscribe(() => {
      this.aleartService.done();
    }, () => this.aleartService.failed());
  }
}
