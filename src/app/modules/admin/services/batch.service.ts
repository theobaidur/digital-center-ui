import { AdminBaseService } from './admin-base.service';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { Injectable } from '@angular/core';
import { Payment } from '../models/payment.model';
import { Batch } from '../models/batch.model';

@Injectable({
    providedIn: 'root'
})

export class BatchService extends AdminBaseService<Batch> {
    includes: string[] = [];
    resourceEndPoint = 'batches';
    pageSize = -1;
    normalize(item: HttpResponseItem<Batch>): Batch {
        const data = item.attributes;
        data._type = item.type;
        data.id = item.id;
        this.cache(data, false);
        return data;
    }
    saveIncludes(response: HttpResponse<any>): void {}
}
