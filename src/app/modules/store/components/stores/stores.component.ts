import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { DigitalCenter } from 'src/app/model/digital-center.interface';
import { RequestParam } from 'src/app/interfaces/request-param.interface';
import { BehaviorSubject } from 'rxjs';
import { ComponentInput } from '../../interfaces/component-input.interface';
import { StoreManagerService } from '../../services/store-manager.service';
import { filter, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit, OnChanges {
  @Input() store: string;
  filters: RequestParam[] = [];
  stores: DigitalCenter[] = [];
  inputObserver: BehaviorSubject<ComponentInput> = new BehaviorSubject(null);
  pageObserver: BehaviorSubject<number> = new BehaviorSubject(1);
  storeDetails: DigitalCenter;
  constructor(
    private storeManager: StoreManagerService) {}

  ngOnInit() {
    this.inputObserver.next({
      store: this.store
    });
    this.inputObserver.pipe(
      filter(() => !!this.store),
      switchMap(() => this.storeManager.resolveBySlug(this.store)),
      filter(store => !!store),
      switchMap(store => {
        this.storeDetails = store;
        return this.pageObserver.pipe(
          switchMap(page => {
            const filters = [...this.filters];
            filters.push({property: 'filter[id]', value: `!eq,${this.storeDetails.id}`});
            return this.storeManager.getPage(page, filters);
          })
        );
      }),
      map(({list}) => list)
    ).subscribe(list => this.stores = list);
  }

  ngOnChanges(changes: SimpleChanges) {
    const change: ComponentInput = {};
    if (changes.store) {
      change.store = changes.store.currentValue;
      this.inputObserver.next(change);
    }
  }


}
