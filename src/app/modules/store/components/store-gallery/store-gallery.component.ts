import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { tns, TinySliderSettings, TinySliderInstance} from 'tiny-slider/src/tiny-slider';
import { Product } from '../../models/product.model';
import { BehaviorSubject, merge, of } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { distinctUntilChanged, delay, filter, switchMap, map, tap } from 'rxjs/operators';
import { ProductManagerService } from '../../services/product-manager.service';
import { SlugManagerService } from '../../services/slug-manager.service';
import { RequestParam } from 'src/app/interfaces/request-param.interface';
import { StoreManagerService } from '../../services/store-manager.service';
@Component({
  selector: 'app-store-gallery',
  templateUrl: './store-gallery.component.html',
  styleUrls: ['./store-gallery.component.scss']
})
export class StoreGalleryComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('elem', {static: false}) elem: ElementRef;
  @ViewChild('viewport', {static: false}) viewport: ElementRef;
  @Input() store: string;
  storeObserver: BehaviorSubject<string> = new BehaviorSubject(null);
  products: Product[] = [];
  marginLeft = 0;
  timer: any;
  constructor(
    private productManager: ProductManagerService,
    private slugManager: SlugManagerService,
    private storeManager: StoreManagerService
  ) { }

  ngOnInit() {
    this.storeObserver.next(this.store);
    this.storeObserver.pipe(
      filter(slug => !!slug),
      switchMap(slug => slug === 'host' ? this.storeManager.resolve('host') : this.slugManager.resolve(slug)),
      map(slug => slug.id),
      switchMap(storeId => {
        const filters: RequestParam[] = [];
        filters.push({
          property: 'filter[show_in_gallery]',
          value: 'eq,1'
        });
        filters.push({
          property: 'filter[digital_center_id]',
          value: 'eq,' + storeId
        });
        return this.productManager.getPage(1, filters);
      }),
      map(({list}) => list)
    ).subscribe(list => this.products = list);
    this.rotate();
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.store) {
      this.storeObserver.next(changes.store.currentValue);
    }
  }

  get slides() {
    return this.products;
  }

  get viewportWidth() {
    if (this.viewport && this.viewport.nativeElement && (this.viewport.nativeElement as HTMLElement).clientWidth) {
      return (this.viewport.nativeElement as HTMLElement).clientWidth;
    }
    return 320;
  }

  goto(direction: 'next' | 'prev') {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (direction === 'next') {
      this.rotate();
    }
    if (direction === 'prev') {
      this.rotate(true);
    }
  }

  rotate(reverse: boolean = false) {

    if (reverse) {
      if (this.marginLeft - 320 >= 320) {
        this.marginLeft -= 320;
      } else {
        this.marginLeft = 0;
      }
    } else {
      const maxViewportItem = this.viewportWidth / 320;
      const itemShown = this.marginLeft / 320;
      const itemRemaining = Math.round((this.slides.length - itemShown - maxViewportItem) * 100) / 100;
      if (itemRemaining > 1) {
        this.marginLeft += 320;
      } else if (itemRemaining) {
        this.marginLeft += 320 * itemRemaining;
      } else {
        this.marginLeft = 0;
      }
    }

    this.timer = setTimeout(() => this.rotate(), 3000);
  }

  get sliderStyle() {
    return {
      width: `${320 * this.slides.length}px`,
      marginLeft: `-${this.marginLeft}px`
    };
  }

  get params() {
    return {
      store: this.store
    };
  }

}
