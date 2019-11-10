import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RequestParam } from 'src/app/interfaces/request-param.interface';
import { Product } from '../../models/product.model';
import { BehaviorSubject } from 'rxjs';
import { ComponentInput } from '../../interfaces/component-input.interface';
import { switchMap, filter, map, tap } from 'rxjs/operators';
import { StoreManagerService } from '../../services/store-manager.service';
import { DigitalCenter } from 'src/app/model/digital-center.interface';
import { ProductManagerService } from '../../services/product-manager.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() store: string;
  @Input() filters: RequestParam[] = [];
  products: Product[] = [];
  inputObserver: BehaviorSubject<ComponentInput> = new BehaviorSubject(null);
  pageObserver: BehaviorSubject<boolean> = new BehaviorSubject(false);
  storeDetails: DigitalCenter;
  lastPage = 1;
  currentPage = 1;
  loading = true;
  constructor(
    private storeManager: StoreManagerService,
    private productManager: ProductManagerService) {}

  ngOnInit() {
    this.inputObserver.next({
      filters: this.filters,
      store: this.store
    });
    this.inputObserver.pipe(
      tap(() => this.loading = true),
      filter(() => !!this.store),
      switchMap(() => this.storeManager.resolveBySlug(this.store)),
      filter(store => !!store),
      switchMap(store => {
        this.storeDetails = store;
        this.products = [];
        this.currentPage = 1;
        return this.pageObserver.pipe(
          map(() => this.currentPage),
          switchMap(page => {
            this.loading = true;
            const filters = [...this.filters];
            const digitalCenterId = this.storeDetails.shop_affiliate_only ? this.storeDetails.affiliate_of : this.storeDetails.id;
            filters.push({property: 'filter[digital_center_id]', value: digitalCenterId});
            return this.productManager.getPage(page, filters);
          })
        );
      }),
      tap(response => {
        this.loading = false;
        if (response.meta && response.meta.page && response.meta.page['last-page']) {
          this.lastPage = +response.meta.page['last-page'];
        }
      }),
      map(({list}) => list)
    ).subscribe(list => this.products = [...this.products, ...list]);
  }

  ngOnChanges(changes: SimpleChanges) {
    const change: ComponentInput = {};
    if (changes.store) {
      change.store = changes.store.currentValue;
    }
    if (change.filters) {
      change.filters = changes.filters.currentValue;
    }
    this.inputObserver.next(change);

  }

  get hasMore() {
    return this.currentPage < this.lastPage;
  }

  loadNext() {
    if (this.hasMore) {
      this.currentPage++;
      this.pageObserver.next(true);
    }
  }

}
