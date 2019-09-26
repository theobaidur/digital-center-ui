import { AdminBaseService } from './admin-base.service';
import { DigitalCenter } from 'src/app/model/digital-center.interface';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { AttachmentService } from './attachment.service';
import { Attachment } from '../../store/models/attachment.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class DigitalCenterService extends AdminBaseService<DigitalCenter> {
    includes: string[] = ['attachments'];
    resourceEndPoint = 'digital-centers';
    normalize(item: HttpResponseItem<DigitalCenter>): DigitalCenter {
        item.attributes.id = item.id;
        item.attributes._type = item.type;
        // tslint:disable-next-line: no-string-literal
        if (item && item['relationships'] && item['relationships'].attachments
            // tslint:disable-next-line: no-string-literal
            && Array.isArray(item['relationships'].attachments.data)) {
            // tslint:disable-next-line: no-string-literal
            item['relationships'].attachments.data.forEach(attachment => {
                const info: Attachment = this.attachmentService.fromCache(attachment.id);
                if (info) {
                    item.attributes[info.group] = info.id;
                }
            });
        }
        this.cache(item.attributes, false);
        return item.attributes;
    }
    saveIncludes(response: HttpResponse<any>): void {
        if (response && Array.isArray(response.included)) {
            response.included.forEach(attachment => {
                const data: Attachment = attachment.attributes;
                data.id = attachment.id;
                data._type = attachment.type;
                this.attachmentService.cache(data, false);
            });
        }
        this.attachmentService.notify();
    }

    constructor(
        private attachmentService: AttachmentService
    ) {
        super();
    }
}