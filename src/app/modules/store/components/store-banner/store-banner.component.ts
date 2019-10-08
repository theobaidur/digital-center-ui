import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { StoreManagerService } from '../../services/store-manager.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { DigitalCenter } from 'src/app/model/digital-center.interface';
import { switchMap, distinctUntilChanged } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { SlugManagerService } from '../../services/slug-manager.service';
import { StoreService } from '../../services/store.service';
import { ActivatedRoute } from '@angular/router';
import { SearchOrigin } from '../../interfaces/search-info.interface';
import { SeoService } from 'src/app/services/seo.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-store-banner',
  templateUrl: './store-banner.component.html',
  styleUrls: ['./store-banner.component.scss']
})
export class StoreBannerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() store: string;
  storeObserver: BehaviorSubject<string> = new BehaviorSubject(null);
  storeDetails: DigitalCenter;
  query: string;
  seoUpdater: Subject<any> = new Subject();
  constructor(
    private storeManager: StoreManagerService,
    private slugManager: SlugManagerService,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private seoService: SeoService,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.storeObserver.next(this.store);
    this.storeObserver.pipe(
      untilDestroyed(this),
      distinctUntilChanged(),
      switchMap((slug: string) => {
        if (slug === 'h' || slug === 'host') {
          return this.storeManager.resolve('host');
        }
        return this.slugManager.resolve(slug, 's').pipe(
          switchMap(response => this.storeManager.resolve(response.id))
        );
      }),
    ).subscribe(center => {
      this.storeDetails = center;
      this.seoUpdater.next(true);
    });
    this.route.queryParams.subscribe(query => {
      if (query.search && query.location !== SearchOrigin.STORE_BANNER) {
        this.query = query.search;
      }
    });
    this.languageService.language.subscribe(lan => this.seoUpdater.next(true));

    this.seoUpdater.subscribe(() => {
      const lng = this.languageService.language.getValue().toLowerCase() === 'bn' ? '_bn' : '';
      const center: DigitalCenter = this.storeDetails;
      if (center) {
        const title = center['name' + lng] || center.name;
        const withPrefix = true;
        this.seoService.updateTag({title, withPrefix});
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.store && changes.store.currentValue) {
      this.storeObserver.next(changes.store.currentValue);
    }
  }

  keyup() {
    this.storeService.searchKeyUp.next({
      query: this.query,
      origin: SearchOrigin.STORE_BANNER
    });
  }

  ngOnDestroy() {}
}
