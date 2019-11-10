import { AdminBaseService } from './admin-base.service';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { Injectable } from '@angular/core';
import { Earning } from '../models/earning.model';
import { Due } from '../../ecommerce-admin/interfaces/due';

@Injectable({
    providedIn: 'root'
})

export class DueService extends AdminBaseService<Due> {
    includes: string[] = [];
    resourceEndPoint = 'earnings/dues';
    normalize(item: HttpResponseItem<Earning>): Earning {
        item.attributes.id = item.id;
        item.attributes._type = item.type;
        this.cache(item.attributes, false);
        return item.attributes;
    }
    saveIncludes(response: HttpResponse<any>): void {}
}
