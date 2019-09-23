import { BehaviorSubject, Observable, of } from 'rxjs';
import { Repository } from 'src/app/interfaces/repository.interface';
import { HttpBase } from 'src/app/services/http.service';
import { RequestParam } from 'src/app/interfaces/request-param.interface';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { map } from 'rxjs/operators';
import { ServiceLocator } from 'src/app/services/service-locator';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';

export abstract class AdminBaseService<T> {
    protected manager: BehaviorSubject<Repository<T>> = new BehaviorSubject({});
    protected repository: Repository<T> = {};
    protected http: HttpBase;
    abstract includes: string[];
    abstract resourceEndPoint: string;
    defatulFilters: RequestParam[] = [];
    pageSize = 10;
    abstract normalize(responseItem: HttpResponseItem<T>): T;
    abstract saveIncludes(response: HttpResponse<any>): void;

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
    get(id: string, fresh = false): Observable<T> {
        if (this.repository[id] && !fresh) {
            return of(this.repository[id]);
        }
        return this.http.get(`${this.resourceEndPoint}/${id}`, this.includes).pipe(
            map(response => {
                if (response && response.data) {
                    this.saveIncludes(response);
                    return this.normalize(response.data);
                }
                throw new Error('Not found');
            })
        );
    }
    getList(page: number, filters: RequestParam[]= []): Observable<{list?: T[], meta?: any}> {
        const allFilters = this.mergeFilters(...filters);
        if (this.pageSize > 0) {
            allFilters.push({property: 'page[number]', value: page});
        }
        return this.http.get<HttpResponseItem<T>[]>(`${this.resourceEndPoint}`, this.includes, allFilters).pipe(
            map(response => {
                this.saveIncludes(response);
                const list = response.data.map(item => this.normalize(item));
                const meta = response.meta;
                return {list, meta};
            })
        );
    }
    post(data: any): Observable<T> {
        return this.http.post<HttpResponseItem<T>>(`${this.resourceEndPoint}`, data, this.includes).pipe(
            map(response => {
                if (response && response.data) {
                    this.saveIncludes(response);
                    return this.normalize(response.data);
                }
                throw new Error('Not Created');
            })
        );
    }
    update(id: string, data: any): Observable<T> {
        return this.http.put(`${this.resourceEndPoint}/${id}`, data, this.includes).pipe(
            map(response => {
                if (response && response.data) {
                    this.saveIncludes(response);
                    return this.normalize(response.data);
                }
                throw new Error('Not Updated');
            })
        );
    }
    delete(id: string): Observable<boolean> {
        return this.http.delete(`${this.resourceEndPoint}/${id}`).pipe(
            map(response => {
                if (response) {
                    delete this.repository[id];
                    return true;
                }
                throw new Error('Not deleted');
            })
        );
    }
    notify() {
        this.manager.next(this.repository);
    }
    cache(item: T, notify: boolean = true) {
        // tslint:disable-next-line: no-string-literal
        this.repository[item['id']] = item;
        if (notify) { this.notify(); }
    }

    exists(id: string | T): boolean {
        // tslint:disable-next-line: no-string-literal
        const itemId = typeof id === 'string' ? id : id['id'];
        return !!(this.repository[itemId] && Object.values(this.repository[itemId]).length);
    }

    get all() {
        return this.manager.pipe(
            map(repository => Object.values(repository))
        );
    }

    constructor() {
        this.http = ServiceLocator.injector.get(HttpBase);
    }
}
