import { AdminBaseService } from './admin-base.service';
import { Injectable } from '@angular/core';
import { HttpResponseItem } from '../../../interfaces/http-response-item.interface';
import { HttpResponse } from '../../../interfaces/http-response.interface';
import { Biggapon } from '../models/biggapon.model';
import { Attachment } from '../../store/models/Attachment.model';
import { AttachmentService } from './attachment.service';
import { Base } from '../../../model/_base.interface';
@Injectable({
    providedIn: 'root'
})

export class BiggaponService extends AdminBaseService<Biggapon> {
    includes: string[] = ['attachments'];
    resourceEndPoint = 'biggapons';
    pageSize = -1;
    normalize(item: HttpResponseItem<Biggapon>): Biggapon {
        const data = item.attributes;
        data._type = item.type;
        data.id = item.id;
        // tslint:disable-next-line: no-string-literal
        if (item && item['relationships'] && item['relationships'].attachments
            // tslint:disable-next-line: no-string-literal
            && Array.isArray(item['relationships'].attachments.data)) {
            // tslint:disable-next-line: no-string-literal
            item['relationships'].attachments.data.forEach(attachment => {
                const info: Attachment = this.attachmentService.fromCache(attachment.id);
                if (info) {
                    data[info.group] = info.id;
                }
            });
        }
        this.cache(data, false);
        return data;
    }
    saveIncludes(response: HttpResponse<any>): void {
        if (response && Array.isArray(response.included)) {
            response.included.forEach(include => {
                const data: Base = include.attributes;
                data.id = include.id;
                data._type = include.type;
                switch (include.type) {
                    case 'attachments':
                        this.attachmentService.cache(data, false);
                        break;
                    default:
                        break;
                }
            });
        }
        this.attachmentService.notify();
    }
    constructor(
        private attachmentService: AttachmentService
    ) {
        super();
        this.getList().subscribe();
    }
}
