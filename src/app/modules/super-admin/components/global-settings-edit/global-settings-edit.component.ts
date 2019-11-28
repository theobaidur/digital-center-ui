import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { GlobalSettingService } from '../../../admin/services/global-setting.service';

interface Config{
  value?: string;
  value_bn?: string;
}
@Component({
  selector: 'app-global-settings-edit',
  templateUrl: './global-settings-edit.component.html',
  styleUrls: ['./global-settings-edit.component.scss']
})
export class GlobalSettingsEditComponent implements OnInit {
  model: {[key: string]: any} = {};
  editorConfig: AngularEditorConfig = {
      editable: true,
        height: 'auto',
        minHeight: '0',
        maxHeight: 'auto',
        width: 'auto',
        minWidth: '0',
        enableToolbar: true,
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
      toolbarHiddenButtons: [
        ['bold', 'italic'],
        ['fontSize']
      ]
  };
  constructor(
    private globalSettingService: GlobalSettingService
  ) { }

  ngOnInit(){
    this.globalSettingService.getList().subscribe(({list})=>{
      list.forEach(item=>{
        this.model[item.type] = item.value;
      });
    });
  }

}
