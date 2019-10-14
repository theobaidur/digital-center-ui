import { AdminBaseService } from './admin-base.service';
import { Division } from '../models/division.model';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { Injectable } from '@angular/core';
import { ShippingCharge } from '../models/shipping-charge.model';

@Injectable({
    providedIn: 'root'
})

export class ShippingChargeService extends AdminBaseService<ShippingCharge> {
    includes: string[] = [];
    resourceEndPoint = 'shipping-charges';
    pageSize = -1;
    normalize(item: HttpResponseItem<Division>): Division {
        const data = item.attributes;
        data._type = item.type;
        data.id = item.id;
        this.cache(data, false);
        return data;
    }
    saveIncludes(response: HttpResponse<any>): void {}
    constructor() {
        super();
        this.getList().subscribe();
    }
}
