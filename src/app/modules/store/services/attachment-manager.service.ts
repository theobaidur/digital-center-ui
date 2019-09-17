import { Injectable } from '@angular/core';
import { Repository } from '../../../interfaces/repository.interface';
import { Attachment } from '../models/Attachment.model';
import { HttpBase } from 'src/app/services/http.service';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SlugManagerService } from './slug-manager.service';
import { RequestParam } from 'src/app/interfaces/request-param.interface';
import { map, tap } from 'rxjs/operators';
import { ServiceLocator } from 'src/app/services/service-locator';

@Injectable({
    providedIn: 'root'
})

export class AttachmentManagerService {
    includes: string[] = [];
    resourceEndPoint = 'attachments';
    manager: BehaviorSubject<Repository<Attachment>> = new BehaviorSubject({});
    repository: Repository<Attachment> = {};
    http: HttpBase;
    attachmentManager: AttachmentManagerService;
    slugManager: SlugManagerService;
    defatulFilters: RequestParam[] = [];
    pageSize = 10;
    private generic: Attachment = {
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8/h8AApMByMhOLQwAAAAASUVORK5CYII=',
    };
    normalize(responseItem: HttpResponseItem<Attachment>): Attachment {
        return responseItem.attributes;
    }
    saveIncludes(): void {}

    getOrDefault(id: string, group: string = 'undefined') {
        const defaultItem = {...this.generic, group};
        return this.repository[id] || defaultItem;
    }
    mergeFilters(...filters: RequestParam[]) {
        const merged = this.defatulFilters.concat(filters);
        if (this.pageSize > 0) {
            merged.push({
                property: 'page[size]',
                value: this.pageSize
            });
        }
        return merged;
    }
    fetchOne(id: string): Observable<HttpResponse<HttpResponseItem<Attachment>>> {
        return this.http.get(`${this.resourceEndPoint}/${id}`, this.includes);
    }
    fetchList(page: number, filters: RequestParam[]= []): Observable<HttpResponse<HttpResponseItem<Attachment>[]>> {
        const allFilters = this.mergeFilters(...filters);
        if (this.pageSize > 0) {
            allFilters.push({property: 'page[number]', value: page});
        }
        return this.http.get(`${this.resourceEndPoint}`, this.includes, allFilters);
    }
    notify() {
        this.manager.next(this.repository);
    }
    register(item: Attachment, notify: boolean = true) {
        // tslint:disable-next-line: no-string-literal
        this.repository[item['id']] = item;
        if (notify) { this.notify(); }
    }

    resolve(id: string): Observable<Attachment> {
        if (this.repository[id]) {
            return of(this.repository[id]);
        }
        return this.fetchOne(id).pipe(
            map(response => {
                this.saveIncludes();
                if (response && response.data) {
                    return this.normalize(response.data);
                }
                throw new Error('Not found');
            })
        );
    }

    exists(id: string | Attachment): boolean {
        // tslint:disable-next-line: no-string-literal
        const itemId = typeof id === 'string' ? id : id['id'];
        return !!(this.repository[itemId] && Object.values(this.repository[itemId]).length);
    }

    getPage(page: number, filters: RequestParam[] = []): Observable<Attachment[]> {
        return this.fetchList(page, filters).pipe(
            tap(response => this.saveIncludes()),
            map(response => response.data.map(item => this.normalize(item))),
            tap(() => this.notify())
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
