import { Component, OnInit } from '@angular/core';
import { Union } from 'src/app/modules/admin/models/union';
import { Subject, of } from 'rxjs';
import { LocationService } from 'src/app/modules/admin/services/location.service';
import { UnionService } from 'src/app/modules/admin/services/union.service';
import { ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';
import { filter, switchMap, map, distinctUntilChanged, tap } from 'rxjs/operators';
import { Upazila } from 'src/app/modules/admin/models/upazila';
import { UpazilaService } from 'src/app/modules/admin/services/upazila.service';
import { FieldError } from 'src/app/interfaces/field-error.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-upazila-edit',
  templateUrl: './upazila-edit.component.html',
  styleUrls: ['./upazila-edit.component.scss']
})
export class UpazilaEditComponent implements OnInit {
  model: Upazila = {};
  modelChanged: Subject<Upazila> = new Subject();
  processing = false;
  errors: FieldError[] = [];
  getErrors(field: string): string[] {
    return this.errors.map(error => error.detail)
    .filter(detail => !!detail)
    .map(detail => detail.split('|')).filter(parts => parts[0] === field).map(parts => parts[1]);
  }
  constructor(
    private locationService: LocationService,
    private upazilaService: UpazilaService,
    private route: ActivatedRoute,
    private aleartService: SweetAlertService
  ) { }
  ngOnInit() {
    this.modelChanged.pipe(
      filter((model) => !!model),
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
      switchMap(id => this.upazilaService.get(id)),
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

  divisionChanged() {
    this.model.district_id = null;
  }

  submit() {
    this.errors = [];
    const data: any = {
      type: 'upazilas',
      id: this.model.id,
      attributes: {
        name: this.model.name,
        name_bn: this.model.name_bn,
        district_id: this.model.district_id
      }
    };
    this.aleartService.saving();
    this.upazilaService.update(this.model.id, {data}).subscribe(() => {
      this.aleartService.done();
    }, (err: HttpErrorResponse) => {
      if (err && err.error && err.error.errors) {
        this.errors = err.error.errors;
      }
      this.aleartService.failed();
    });
  }
}
