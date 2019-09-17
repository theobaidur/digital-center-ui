

import { Injectable } from '@angular/core';
import { DigitalCenter } from 'src/app/model/digital-center.interface';
import { ManagerService } from './manager-base.service';
import { Attachment } from '../models/attachment.model';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class StoreManagerService extends ManagerService<DigitalCenter> {
    resourceEndPoint = 'digital-centers';
    includes = ['attachments'];
    host: BehaviorSubject<DigitalCenter> = new BehaviorSubject(null);
    saveIncludes(response: HttpResponse<any>): void {
        if (response && response.included && Array.isArray(response.included)) {
            response.included.forEach(item => {
                if (item && item.type && item.id && item.attributes) {
                    const attachment: Attachment = item.attributes;
                    attachment.id = item.id;
                    attachment._type = item.type;
                    this.attachmentManager.register(attachment, false);
                }
            });
        }
        this.attachmentManager.notify();
    }
    normalize(item: HttpResponseItem<DigitalCenter>): DigitalCenter {
        item.attributes.id = item.id;
        item.attributes._type = item.type;
        // tslint:disable-next-line: no-string-literal
        if (item && item['relationships'] && item['relationships'].attachments
            // tslint:disable-next-line: no-string-literal
            && Array.isArray(item['relationships'].attachments.data)) {
            // tslint:disable-next-line: no-string-literal
            item['relationships'].attachments.data.forEach(attachment => {
                const info: Attachment = this.attachmentManager.getOrDefault(attachment.id);
                item.attributes[info.group] = info.id;
            });
        }

        this.register(item.attributes, false);
        return item.attributes;
    }

    resolve(id: string): Observable<DigitalCenter> {
        if (id === 'host') {
            return this.host.pipe(
                filter(host => !!host)
            );
        }
        return super.resolve(id);
    }
    resolveBySlug(slug: string) {
        if (slug === 'host') {
            return this.resolve(slug);
        }
        return this.slugManager.resolve(slug, 's').pipe(
            switchMap(response => this.resolve(response.id))
        );
    }
    constructor() {
        super();
        this.getPage(1).subscribe();
        this.fetchOne('host').subscribe(response => {
            const host: DigitalCenter = this.normalize(response.data);
            this.host.next(host);
        });
    }
}
