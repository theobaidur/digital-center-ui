import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SearchInfo } from '../interfaces/search-info.interface';

@Injectable({
    providedIn: 'root'
})

export class StoreService {
    public searchKeyUp: Subject<SearchInfo> = new Subject();
    constructor(
        public router: Router,
        public route: ActivatedRoute
    ) {
        this.searchKeyUp.subscribe(data => {
            if (!(data && data.query)) {
                this.router.navigate([], {relativeTo: this.route});
            } else {
                this.router.navigate([], {
                    queryParams: {
                        search: data.query,
                        origin: data.origin || 'URL'
                    }
                });
            }
        });
    }

    resetSearch() {
        this.router.navigate([], {relativeTo: this.route});
    }
}
