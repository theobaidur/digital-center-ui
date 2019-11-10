import { Component, OnInit, Input } from '@angular/core';
import { HttpBase } from 'src/app/services/http.service';
import { StoreManagerService } from '../../services/store-manager.service';
import { filter, switchMap } from 'rxjs/operators';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';

@Component({
  selector: 'app-shipping-charge',
  templateUrl: './shipping-charge.component.html',
  styleUrls: ['./shipping-charge.component.scss']
})
export class ShippingChargeComponent implements OnInit {
  @Input() store: string;
  list: any[] = [];
  loading = false;
  constructor(
    private http: HttpBase,
    private storeManager: StoreManagerService
  ) { }

  ngOnInit() {
    if (this.store) {
      this.loading = true;
      this.storeManager.resolve(this.store).pipe(
        filter(host => !!host.id),
        switchMap(host => this.http.get<HttpResponseItem<any>[]>('shipping-charges', [], [{
          property: 'filter[digital_center_id]',
          value: host.shop_affiliate_only ? host.affiliate_of : host.id
        }]))
      ).subscribe(list => {
        this.loading = false;
        this.list = list.data.map(item => item.attributes);
      });
    }
  }

}
