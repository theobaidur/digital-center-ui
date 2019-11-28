import { AdminBaseService } from './admin-base.service';
import { Injectable } from '@angular/core';
import { DeliveryArea } from '../models/delivery-area.model';
import { HttpResponseItem } from '../../../interfaces/http-response-item.interface';
import { HttpResponse } from '../../../interfaces/http-response.interface';
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
