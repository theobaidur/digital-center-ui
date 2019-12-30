import { Component, OnInit } from '@angular/core';
import { StoreUiService } from '../../services/store-ui.service';
import { merge, fromEvent, of, combineLatest, Observable } from 'rxjs';
import { map, filter, tap, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SlugManagerService } from '../../services/slug-manager.service';
import { CategoryManagerService } from '../../services/category-manager.service';
import { Slug } from '../../interfaces/slug.interface';
import { StoreService } from '../../services/store.service';
import { StoreManagerService } from '../../services/store-manager.service';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';

@Component({
  selector: 'app-store-base',
  templateUrl: './store-base.component.html',
  styleUrls: ['./store-base.component.scss']
})
export class StoreBaseComponent implements OnInit {
  hideSideNav: boolean;
  store: string;
  storeView: string;
  viewResolving = false;
  showingCart = false;
  category: string;
  product: string;
  pages: string[] = ['offers', 'popular-items', 'stores', 'delivery-areas', 'terms-and-condition', 'track-verify-order'];
  constructor(
    private uiService: StoreUiService,
    private route: ActivatedRoute,
    private slugManager: SlugManagerService,
    private router: Router,
    private categoryManager: CategoryManagerService,
    private storeManager: StoreManagerService,
    private alertService: SweetAlertService,
    private storeService: StoreService ) { }

  getStore(store: string): Observable<string> {
    if (!store) {
      return of('host');
    }
    if (store === 'host') {
      return of(store);
    }
    return this.slugManager.resolve(store, 's').pipe(map(slug => slug.slug));
  }
  getSlug(slug: string): Observable<Slug> {
    if (!slug) {
      return of(null);
    }
    if (this.pages.indexOf(slug.toLowerCase()) > -1) {
      return of({
        slug,
        type: slug,
        id: null
      });
    }
    return this.slugManager.resolve(slug).pipe(map(response => response || null));
  }
  ngOnInit() {
    this.uiService.collapseSideNav.subscribe(hide => this.hideSideNav = hide);
    this.uiService.cartShown.subscribe(hide => this.showingCart = hide);
    this.uiService.windowWidth.pipe(
      filter(width => width < 768)
    ).subscribe(() => this.uiService.collapseSideNav.next(true));

    combineLatest(this.route.params, this.route.queryParams)
    .pipe(
      tap(() => this.viewResolving = true),
      switchMap(() => {
        const snapshot = this.route.snapshot;
        const slug: string = snapshot.params.slug || '';
        const store: string = snapshot.queryParams.store || 'host';
        if (slug.toLowerCase() === 'not-found') {
          return of('not-found');
        }

        return combineLatest(this.getStore(store), this.getSlug(slug)).pipe(
          map(value => {
            this.store = value[0];
            if (value[1]) {
              if (this.pages.indexOf(value[1].type) > -1) {
                return value[1].slug;
              }
              switch (value[1].type) {
                case 'p':
                  this.product = value[1].id;
                  return 'product-details';
                case 'c':
                  this.category = value[1].id;
                  return 'sub-category-or-product';
                default:
                  return 'home';
              }
            } else {
              return 'home';
            }
          })
        );
      }),
      switchMap(view => {
        if (view === 'sub-category-or-product') {
          return this.categoryManager.categories(this.category).pipe(
            map(list => list.length ? 'choose-sub-category' : 'product-list')
          );
        }
        return of(view);
      })
    )
    .subscribe(view => {
      const queryParams = this.route.snapshot.queryParams;
      if (queryParams.search) {
        view = 'search-result';
      }
      this.storeView = view;
      this.viewResolving = false;
      this.redirectIfInactive(this.store, view);
      }, err => {
        this.router.navigate(['/shop/not-found']);
      });
    }

    redirectIfInactive(store: string, currentView: string) {
      if (currentView !== 'stores') {
        this.storeManager.resolve(store).subscribe(center => {
          if (center && !center.active) {
            this.alertService.shopClosed();
          }
        });
      }
    }

}
