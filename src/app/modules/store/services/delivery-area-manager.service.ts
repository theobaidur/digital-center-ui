import { Injectable } from '@angular/core';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { ManagerService } from './manager-base.service';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { DeliveryArea } from '../../admin/models/delivery-area.model';

@Injectable({
    providedIn: 'root'
})

export class DeliveryAreaManagerService extends ManagerService<DeliveryArea> {
    includes: string[] = [];
    resourceEndPoint = 'delivery-areas';
    pageSize = -1;
    normalize(item: HttpResponseItem<DeliveryArea>): DeliveryArea {
        item.attributes.id = item.id;
        item.attributes._type = item.type;
        this.register(item.attributes, false);
        return item.attributes;
    }
    saveIncludes(response: HttpResponse<any>): void {}
}
