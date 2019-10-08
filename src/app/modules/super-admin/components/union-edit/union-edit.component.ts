import { Component, OnInit } from '@angular/core';
import { Union } from 'src/app/modules/admin/models/union';
import { Subject, of } from 'rxjs';
import { LocationService } from 'src/app/modules/admin/services/location.service';
import { ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';
import { filter, switchMap, map, distinctUntilChanged, tap } from 'rxjs/operators';
import { UnionService } from 'src/app/modules/admin/services/union.service';

@Component({
  selector: 'app-union-edit',
  templateUrl: './union-edit.component.html',
  styleUrls: ['./union-edit.component.scss']
})
export class UnionEditComponent implements OnInit {
  model: Union = {};
  modelChanged: Subject<Union> = new Subject();
  processing = false;
  constructor(
    private locationService: LocationService,
    private unionService: UnionService,
    private route: ActivatedRoute,
    private aleartService: SweetAlertService
  ) { }
  ngOnInit() {
    this.modelChanged.pipe(
      filter((model) => !!model),
      switchMap((model) => {
        if (!model.upazila_id) {
          return of(model);
        }
        return this.locationService.upazilas.pipe(
          filter(list => list.length > 0),
          map(list => {
            const upazila = list.find(item => item.id === model.upazila_id);
            if (upazila) {
              model.district_id = upazila.district_id;
            }
            return model;
          })
        );
      }),
      switchMap((model) => {
        if (!model.district_id) {
          return of(model);
        }
        return this.locationService.districts.pipe(
          filter(list => list.length > 0),
          map(list => {
            const district = list.find(item => item.id === model.district_id);
            if (district) {
              model.division_id = district.division_id;
            }
            return model;
          })
        );
      })
    ).subscribe(model => {
      this.model = model;
    });
    this.route.params
    .pipe(
      filter(params => !!params.id),
      map(params => params.id),
      distinctUntilChanged(),
      tap(() => this.aleartService.loading()),
      switchMap(id => this.unionService.get(id)),
      tap(() => this.aleartService.close())
    )
    .subscribe(response => {
      this.modelChanged.next(response);
    });
  }

  get divisions() {
    return this.locationService.divisions.getValue();
  }

  get districts() {
    return this.locationService.districts.getValue()
    .filter(district => !this.model.division_id || district.division_id === this.model.division_id);
  }

  get upazilas() {
    return this.locationService.upazilas.getValue()
    .filter(upazila => !this.model.district_id || upazila.district_id === this.model.district_id);
  }

  divisionChanged() {
    this.model.district_id = null;
    this.model.upazila_id = null;
  }

  districtChanged() {
    this.model.upazila_id = null;
  }

  submit() {
    const data: any = {
      type: 'unions',
      id: this.model.id,
      attributes: {
        name: this.model.name,
        name_bn: this.model.name_bn,
        upazila_id: this.model.upazila_id
      }
    };
    this.aleartService.saving();
    this.unionService.update(this.model.id, {data}).subscribe(() => {
      this.aleartService.done();
    }, () => this.aleartService.failed());
  }
}
