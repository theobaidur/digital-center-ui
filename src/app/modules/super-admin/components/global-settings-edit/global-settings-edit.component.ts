import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { GlobalSettingService } from '../../../admin/services/global-setting.service';
import { SweetAlertService } from '../../../admin/services/sweet-alert.service';
import { FieldError } from '../../../../interfaces/field-error.interface';
import { HttpErrorResponse } from '@angular/common/http';

interface Config {
  value?: string;
  value_bn?: string;
}
@Component({
  selector: 'app-global-settings-edit',
  templateUrl: './global-settings-edit.component.html',
  styleUrls: ['./global-settings-edit.component.scss']
})
export class GlobalSettingsEditComponent implements OnInit {
  errors: FieldError = {};
  model: {[key: string]: any} = {};
  editorConfig: AngularEditorConfig = {
      editable: true,
        height: 'auto',
        minHeight: '200px',
        maxHeight: 'auto',
        width: 'auto',
        minWidth: '0',
        enableToolbar: false,
        showToolbar: true,
        placeholder: 'Enter text here...',
        defaultParagraphSeparator: '',
        defaultFontName: '',
        defaultFontSize: '',
        fonts: [
          {class: 'arial', name: 'Arial'},
          {class: 'times-new-roman', name: 'Times New Roman'}
        ],
      toolbarPosition: 'top',
      toolbarHiddenButtons: [['Background Color']]
  };
  constructor(
    private globalSettingService: GlobalSettingService,
    private aleartService: SweetAlertService
  ) { }

  ngOnInit() {
    this.aleartService.loading();
    this.globalSettingService.getList().subscribe(({list}) => {
      list.forEach(item => {
        if(item.value){
          this.model[item.key] = item.value;
        }
        if(item.value_bn){
          this.model[`${item.key}_bn`] = item.value_bn;
        }
      });
      this.aleartService.close();
    });
  }

  submit() {
    this.errors = {};
    const dataCopy = {...this.model};
    for (const key in this.model) {
      if (key.endsWith('_bn')) {
        const enKey = key.substr(0, key.length - 3);
        if (!this.model[enKey]) {
          dataCopy[enKey] = null;
        }
      } else {
        const bnKey = `${key}_bn`;
        if (!this.model[bnKey]) {
          dataCopy[bnKey] = null;
        }
      }
    }
    const data: any = {
      type: 'global-settings',
      attributes: Object.keys(dataCopy).reduce((arr, key) => {
        if (key.endsWith('_bn')) {
          return arr;
        } else {
          arr.push({
            key,
            value: dataCopy[key],
            value_bn: dataCopy[`${key}_bn`]
          });
          return arr;
        }
      }, [])
    };
    this.aleartService.saving();
    this.globalSettingService.post({data}, 'global-settings/save').subscribe(response => {
      this.aleartService.done();
    }, (err: HttpErrorResponse) => {
      if (err && err.error && err.error.errors) {
        this.errors = err.error.errors;
      }
      this.aleartService.failed();
    });
  }

}
