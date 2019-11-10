import { Component, OnInit, Input } from '@angular/core';
import { StoreManagerService } from '../../services/store-manager.service';
import { filter, switchMap } from 'rxjs/operators';
import { DeliveryAreaManagerService } from '../../services/delivery-area-manager.service';

@Component({
  selector: 'app-delivery-area',
  templateUrl: './delivery-area.component.html',
  styleUrls: ['./delivery-area.component.scss']
})
export class DeliveryAreaComponent implements OnInit {
  @Input() store: string;
  list: any[] = [];
  loading = false;
  constructor(
    private storeManager: StoreManagerService,
    private deliveryAreaService: DeliveryAreaManagerService
  ) { }

  ngOnInit() {
    if (this.store) {
      this.loading = true;
      this.storeManager.resolveBySlug(this.store).pipe(
        filter(host => !!host),
        switchMap(center => this.deliveryAreaService.getPage(-1, [{
          property: `filter[digital_center_id]`,
          value: center.shop_affiliate_only ? center.affiliate_of : center.id
        }]))
      ).subscribe(({list}) => {
        this.loading = false;
        this.list = list;
      });
    }
  }

}
