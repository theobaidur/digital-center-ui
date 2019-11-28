import { Component, OnInit } from '@angular/core';
import { DigitalCenterSetting } from '../../../admin/models/digital-center-setting.model';
import { FieldError } from '../../../../interfaces/field-error.interface';
import { DigitalCenterSettingService } from '../../../admin/services/digital-center-setting.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetAlertService } from '../../../admin/services/sweet-alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-digital-center-settings-add',
  templateUrl: './digital-center-settings-add.component.html',
  styleUrls: ['./digital-center-settings-add.component.scss']
})
export class DigitalCenterSettingsAddComponent implements OnInit {
  model: DigitalCenterSetting = {};
  processing = false;
  errors: FieldError[] = [];
  digitalCenterId?: string;
  attachment: File;
  types: {label: string, value: string}[] = [{
    value: 'theme',
    label: 'Theme'
  }, {
    value: 'video',
    label: 'Video'
  }];
  getErrors(field: string): string[] {
    return this.errors.map(error => error.detail)
    .filter(detail => !!detail)
    .map(detail => detail.split('|')).filter(parts => parts[0] === field).map(parts => parts[1]);
  }
  constructor(
    private settingsService: DigitalCenterSettingService,
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
    this.attachment = Array.from(files)[0];
  }

  submit() {
    const form = new FormData();
    this.errors = [];
    const data = {
      type: 'digital-center-settings',
      attributes: {
        value: this.model.value,
        value_bn: this.model.value_bn,
        key: this.model.type,
        digital_center_id: this.digitalCenterId,
      }
    };
    form.append('data', JSON.stringify({data}));
    if (this.attachment) {
      form.append('attachment', this.attachment, this.attachment.name);
    }
    this.aleartService.saving();
    this.settingsService.post(form).subscribe(response => {
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
