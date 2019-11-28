import { Component, OnInit } from '@angular/core';
import { Advertisement } from '../../../admin/models/advertisement.model';
import { FieldError } from '../../../../interfaces/field-error.interface';
import { AdvertisementService } from '../../../admin/services/advertisement.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetAlertService } from '../../../admin/services/sweet-alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-advertisement-add',
  templateUrl: './advertisement-add.component.html',
  styleUrls: ['./advertisement-add.component.scss']
})
export class AdvertisementAddComponent implements OnInit {
  model: Advertisement = {};
  processing = false;
  errors: FieldError[] = [];
  digitalCenterId?: string;
  media: File;
  types: {label: string, value: string}[] = [{
    value: 'image',
    label: 'Image'
  }, {
    value: 'video',
    label: 'Video'
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
    private advertisementService: AdvertisementService,
    private router: Router,
    private route: ActivatedRoute,
    private aleartService: SweetAlertService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.digitalCenterId) {
        this.digitalCenterId = params.digitalCenterId;
      } else {
        this.router.navigate(['/super-admin/digital-center-list']);
      }
    });
  }

  fileSelected(files: FileList) {
    this.media = Array.from(files)[0];
  }

  submit() {
    const form = new FormData();
    this.errors = [];
    const data = {
      type: 'advertisements',
      attributes: {
        title: this.model.title,
        title_bn: this.model.title_bn,
        target: this.model.target,
        advertisement_type: this.model.advertisement_type,
        location: this.model.location,
        digital_center_id: this.digitalCenterId,
      }
    };
    form.append('data', JSON.stringify({data}));
    if (this.media) {
      form.append('media', this.media, this.media.name);
    }
    this.aleartService.saving();
    this.advertisementService.post(form).subscribe(response => {
      this.aleartService.done();
      this.router.navigate(['/super-admin/digital-center-edit', this.digitalCenterId]);
    }, (err: HttpErrorResponse) => {
      if (err && err.error && err.error.errors) {
        this.errors = err.error.errors;
      }
      this.aleartService.failed();
    });
  }
}
