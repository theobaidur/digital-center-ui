import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { DigitalCenter } from 'src/app/model/digital-center.interface';
import { RequestParam } from 'src/app/interfaces/request-param.interface';
import { BehaviorSubject } from 'rxjs';
import { ComponentInput } from '../../interfaces/component-input.interface';
import { StoreManagerService } from '../../services/store-manager.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit, OnChanges {
  @Input() store: string;
  storeDetails: DigitalCenter;
  filters: RequestParam[] = [];
  inputObserver: BehaviorSubject<ComponentInput> = new BehaviorSubject(null);

  constructor(
    private storeManager: StoreManagerService
  ) {}

  ngOnInit() {
    this.inputObserver.next({
      store: this.store
    });
    this.inputObserver.pipe(
      switchMap(() => this.storeManager.resolveBySlug(this.store))
    ).subscribe(store => {
      this.storeDetails = store;
      this.filters = [
        {property: 'filter[digital_center_id]', value: `eq,${store.id}`},
        {property: 'filter[promotion_running]', value: `eq,1`},
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
