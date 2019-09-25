import { AdminBaseService } from '../services/admin-base.service';
import { BehaviorSubject, merge } from 'rxjs';
import { throttleTime, distinctUntilChanged, switchMap, tap, map, debounceTime } from 'rxjs/operators';
import { RequestParam } from 'src/app/interfaces/request-param.interface';
import { SweetAlertService } from '../services/sweet-alert.service';
import { ServiceLocator } from 'src/app/services/service-locator';

export abstract class AdminListPage<T> {
    private dataService: AdminBaseService<T>;
    private alertService: SweetAlertService;
    defaultParams: RequestParam[] = [{
        property: 'sort',
        value: '-created_at'
    }];
    list: T[] = [];
    searchObserver: BehaviorSubject<string> = new BehaviorSubject(null);
    pageObserver: BehaviorSubject<boolean> = new BehaviorSubject(false);
    init: BehaviorSubject<boolean> = new BehaviorSubject(false);
    lastPage = 1;
    currentPage = 1;
    loading = true;
    abstract createPageLink(): string;
    abstract detailPageLink(id: string): string;
    constructor(
        dataService: AdminBaseService<T>
    ) {
        this.dataService = dataService;
        this.alertService = ServiceLocator.injector.get(SweetAlertService);
        this.dataService.all.subscribe(list => this.list = list);
        merge(this.searchObserver.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.list = [])
        ), this.pageObserver)
        .pipe(
        switchMap(() => {
            this.loading = true;
            const params: RequestParam[] = [...this.defaultParams];
            if (this.searchObserver.getValue()) {
                params.push({
                property: 'search',
                value: this.searchObserver.getValue()
                });
            }
            return this.dataService.getList(this.currentPage, params).pipe(
            tap(response => {
                this.loading = false;
                if (response.meta && response.meta.page && response.meta.page['last-page']) {
                this.lastPage = +response.meta.page['last-page'];
                }
            })
            );
        })
        ).subscribe();
    }

    delete(id: string) {
        this.alertService.delete().then(
            ({value}) => {
                if (value) {
                    this.alertService.saving('Deleting...');
                    return this.dataService.delete(id).toPromise();
                } else {
                    return false;
                }
            }
        ).then(deleted => {
            if (deleted) {
                this.alertService.done('Done..');
            }
        });
    }

    search(value: string) {
        this.searchObserver.next(value);
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
