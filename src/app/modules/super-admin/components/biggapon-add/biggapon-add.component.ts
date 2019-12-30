import { Component, OnInit } from '@angular/core';
import { Biggapon } from '../../../admin/models/biggapon.model';
import { FieldError } from '../../../../interfaces/field-error.interface';
import { BiggaponService } from '../../../admin/services/biggapon.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetAlertService } from '../../../admin/services/sweet-alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-biggapon-add',
  templateUrl: './biggapon-add.component.html',
  styleUrls: ['./biggapon-add.component.scss']
})
export class BiggaponAddComponent implements OnInit {
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
      type: 'biggapons',
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
    this.biggaponService.post(form).subscribe(response => {
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
