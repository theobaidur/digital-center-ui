import { AdminBaseService } from './admin-base.service';
import { Division } from '../models/division.model';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { Injectable } from '@angular/core';
import { ShippingCharge } from '../models/shipping-charge.model';
import { DeliveryArea } from '../models/delivery-area.model';

@Injectable({
    providedIn: 'root'
})

export class DeliveryAreaService extends AdminBaseService<DeliveryArea> {
    includes: string[] = [];
    resourceEndPoint = 'delivery-areas';
    pageSize = -1;
    normalize(item: HttpResponseItem<DeliveryArea>): DeliveryArea {
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
