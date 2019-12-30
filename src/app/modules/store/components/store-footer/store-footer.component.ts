import { Component, OnInit } from '@angular/core';
import { DigitalCenter } from 'src/app/model/digital-center.interface';
import { StoreManagerService } from '../../services/store-manager.service';
import { GlobalSettingManager } from 'src/app/services/global-setting-manager.service';

@Component({
  selector: 'app-store-footer',
  templateUrl: './store-footer.component.html',
  styleUrls: ['./store-footer.component.scss']
})
export class StoreFooterComponent implements  OnInit {
  storeDetails: DigitalCenter;
  constructor(
    private storeManager: StoreManagerService,
    public globalSetting: GlobalSettingManager  ) { }

  ngOnInit() {
    this.storeManager.resolve('host').subscribe(center => {
      this.storeDetails = center;
    });
  }
}
