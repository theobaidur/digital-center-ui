import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { RequestParam } from 'src/app/interfaces/request-param.interface';
import { BehaviorSubject } from 'rxjs';
import { ComponentInput } from '../../interfaces/component-input.interface';
import { map, switchMap } from 'rxjs/operators';
import { StoreManagerService } from '../../services/store-manager.service';
import { DigitalCenter } from 'src/app/model/digital-center.interface';

@Component({
  selector: 'app-popular-items',
  templateUrl: './popular-items.component.html',
  styleUrls: ['./popular-items.component.scss']
})
export class PopularItemsComponent implements OnInit, OnChanges {
  @Input() store: string;
  @Input() category: string;
  storeDetails: DigitalCenter;
  filters: RequestParam[] = [];
  inputObserver: BehaviorSubject<ComponentInput> = new BehaviorSubject(null);

  constructor(
    private storeManager: StoreManagerService
  ) {}

  ngOnInit() {
    this.inputObserver.next({
      category: this.category,
      store: this.store
    });
    this.inputObserver.pipe(
      switchMap(() => this.storeManager.resolveBySlug(this.store))
    ).subscribe(store => {
      this.storeDetails = store;
      const digitalCenterId = this.storeDetails.shop_affiliate_only ? this.storeDetails.affiliate_of : this.storeDetails.id;
      this.filters = [
        {property: 'filter[digital_center_id]', value: `eq,${digitalCenterId}`},
        {property: 'sort', value: `sale_count`}
    ];
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const change: ComponentInput = {};
    if (changes.store) {
      change.store = changes.store.currentValue;
    }
    this.inputObserver.next(change);
  }

}
