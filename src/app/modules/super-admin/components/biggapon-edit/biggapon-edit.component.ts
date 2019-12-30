import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Biggapon } from '../../../admin/models/biggapon.model';
import { FieldError } from '../../../../interfaces/field-error.interface';
import { BiggaponService } from '../../../admin/services/biggapon.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetAlertService } from '../../../admin/services/sweet-alert.service';
import { filter, map, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-biggapon-edit',
  templateUrl: './biggapon-edit.component.html',
  styleUrls: ['./biggapon-edit.component.scss']
})
export class BiggaponEditComponent implements OnInit {
  model: Biggapon = {};
  processing = false;
  errors: FieldError[] = [];
  digitalCenterId?: string;
  media: File;
  types: {label: string, value: string}[] = [{
    value: 'image',
    label: 'Image'
  }];

  locations: {label: string, value: string}[] = [{
    value: 'top_left',
    label: 'Top Left'
  }, {
    value: 'top_right',
    label: 'Top Right'
  }, {
    value: 'bottom_left',
    label: 'Bottom Left'
  }, {
    value: 'bottom_right',
    label: 'Bottom Right'
  }];
  getErrors(field: string): string[] {
    return this.errors.map(error => error.detail)
    .filter(detail => !!detail)
    .map(detail => detail.split('|')).filter(parts => parts[0] === field).map(parts => parts[1]);
  }
  constructor(
    private biggaponService: BiggaponService,
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
      switchMap(id => this.biggaponService.get(id)),
      tap(() => this.aleartService.close())
    )
    .subscribe(response => {
      this.model = response;
    });
  }

  fileSelected(files: FileList) {
    this.media = Array.from(files)[0];
  }

  submit() {
    const form = new FormData();
    this.errors = [];
    const data = {
      type: 'biggapons',
      id: this.model.id,
      attributes: {
        title: this.model.title,
        title_bn: this.model.title_bn,
        target: this.model.target,
        biggapon_type: this.model.biggapon_type,
        location: this.model.location,
        digital_center_id: this.digitalCenterId,
      }
    };
    form.append('data', JSON.stringify({data}));
    if (this.media) {
      form.append('media', this.media, this.media.name);
    }
    this.aleartService.saving();
    this.biggaponService.update(this.model.id, form).subscribe((ad) => {
      this.model = ad;
      this.aleartService.done();
    }, (err: HttpErrorResponse) => {
      if (err && err.error && err.error.errors) {
        this.errors = err.error.errors;
      }
      this.aleartService.failed();
    });
  }
}
