import { Component, OnInit, Input } from '@angular/core';
import { GlobalSettingManager } from 'src/app/services/global-setting-manager.service';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss']
})
export class TermsConditionComponent implements OnInit {
  @Input() store: string;
  constructor(
    public globalSetting: GlobalSettingManager
  ) { }

  ngOnInit() {
  }

}
