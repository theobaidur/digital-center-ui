import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { Attachment } from '../models/attachment.model';
import { AttachmentManagerService } from './attachment-manager.service';
import { map } from 'rxjs/operators';
import { ManagerService } from './manager-base.service';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';

@Injectable({
    providedIn: 'root'
})

export class CategoryManagerService extends ManagerService<Category> {
    includes: string[] = ['attachments'];
    resourceEndPoint = 'categories';
    pageSize = -1;
    normalize(item: HttpResponseItem<Category>): Category {
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

    categories(parent: string = null) {
        return this.manager.pipe(
            map(repository => Object.values(repository)),
            map((list: Category[]) => list.filter(item => parent ? item.parent_id === parent : !item.parent_id))
        );
    }

    constructor() {
        super();
        this.getPage(-1).subscribe();
    }
}
