import { AdminBaseService } from './admin-base.service';
import { Attachment } from '../../store/models/attachment.model';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AttachmentService extends AdminBaseService<Attachment> {
    includes: string[] = [];
    resourceEndPoint = 'attachments';
    normalize(responseItem: HttpResponseItem<Attachment>): Attachment {
        const data = responseItem.attributes;
        data._type = responseItem.type;
        data.id = responseItem.id;
        this.cache(data);
        return data;
    }
    saveIncludes(response: HttpResponse<any>): void {}
}
