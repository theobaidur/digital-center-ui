import { Repository } from '../../../interfaces/repository.interface';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { HttpBase } from 'src/app/services/http.service';
import { ServiceLocator } from 'src/app/services/service-locator';
import { RequestParam } from 'src/app/interfaces/request-param.interface';
import { AttachmentManagerService } from './attachment-manager.service';
import { SlugManagerService } from './slug-manager.service';

export abstract class ManagerService<T> {
    protected manager: BehaviorSubject<Repository<T>> = new BehaviorSubject({});
    protected repository: Repository<T> = {};
    protected http: HttpBase;
    protected attachmentManager: AttachmentManagerService;
    protected slugManager: SlugManagerService;
    abstract includes: string[];
    abstract resourceEndPoint: string;
    defatulFilters: RequestParam[] = [];
    pageSize = 10;
    mergeFilters(...filters: RequestParam[]) {
        const merged = [...this.defatulFilters, ...filters];
        if (this.pageSize > 0) {
            merged.push({
                property: 'page[size]',
                value: this.pageSize
            });
        }
        return merged;
    }
    fetchOne(id: string): Observable<HttpResponse<HttpResponseItem<T>>> {
        return this.http.get(`${this.resourceEndPoint}/${id}`, this.includes);
    }
    fetchList(page: number, filters: RequestParam[]= []): Observable<HttpResponse<HttpResponseItem<T>[]>> {
        const allFilters = this.mergeFilters(...filters);
        if (this.pageSize > 0) {
            allFilters.push({property: 'page[number]', value: page});
        }
        return this.http.get(`${this.resourceEndPoint}`, this.includes, allFilters);
    }
    abstract normalize(responseItem: HttpResponseItem<T>): T;
    abstract saveIncludes(response: HttpResponse<any>): void;
    notify() {
        this.manager.next(this.repository);
    }
    register(item: T, notify: boolean = true) {
        // tslint:disable-next-line: no-string-literal
        this.repository[item['id']] = item;
        if (notify) { this.notify(); }
    }

    resolve(id: string): Observable<T> {
        if (this.repository[id]) {
            return of(this.repository[id]);
        }
        return this.fetchOne(id).pipe(
            map(response => {
                this.saveIncludes(response);
                if (response && response.data) {
                    return this.normalize(response.data);
                }
                throw new Error('Not found');
            })
        );
    }
    resolveLocal(id: string): Observable<T> {
        if (this.repository[id]) {
            return of(this.repository[id]);
        }
        throw new Error('Not found');
    }

    exists(id: string | T): boolean {
        // tslint:disable-next-line: no-string-literal
        const itemId = typeof id === 'string' ? id : id['id'];
        return !!(this.repository[itemId] && Object.values(this.repository[itemId]).length);
    }

    getPage(page: number, filters: RequestParam[] = []): Observable<{list?: T[], meta?: any}> {
        return this.fetchList(page, filters).pipe(
            map(response => {
                this.saveIncludes(response);
                const list = response.data.map(item => this.normalize(item));
                const meta = response.meta;
                this.notify();
                return {list, meta};
            })
        );
    }

    get all() {
        return this.manager.pipe(
            map(repository => Object.values(repository))
        );
    }

    constructor() {
        this.attachmentManager = ServiceLocator.injector.get(AttachmentManagerService);
        this.slugManager = ServiceLocator.injector.get(SlugManagerService);
        this.http = ServiceLocator.injector.get(HttpBase);
    }
}
