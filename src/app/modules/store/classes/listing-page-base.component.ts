import { OnDestroy } from '@angular/core';
import { InfiniteScrollbarConfig } from '../directives/infinite-scroller.directive';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceLocator } from 'src/app/services/service-locator';

export class ListingPageBase implements OnDestroy {
    config: InfiniteScrollbarConfig;
    page: BehaviorSubject<number> = new BehaviorSubject(1);
    route: ActivatedRoute;
    router: Router;
    totalPage = 1;
    stateManager = 'route';
    constructor() {
        if (this.stateManager === 'route') {
            this.route = ServiceLocator.injector.get(ActivatedRoute);
            this.router = ServiceLocator.injector.get(Router);
            this.route.params.pipe(
                map(params => +params.page || 1)
            ).subscribe(page => this.page.next(page));
        }
        this.page
        .pipe(distinctUntilChanged())
        .subscribe(page => {
            this.load_page(page);
        });
    }

    load_page(page: number) {}

    scroll_end() {
        let page = this.page.getValue() || 1;
        if (page + 1 < this.totalPage) {
            page++;
            if (this.stateManager === 'route') {
                this.router.navigate([], {
                    queryParams: {page},
                    queryParamsHandling: 'merge'
                });
            } else {
                this.page.next(page);
            }
        }
    }
    ngOnDestroy() {}
}
