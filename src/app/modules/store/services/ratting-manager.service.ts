import { Injectable } from '@angular/core';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { ManagerService } from './manager-base.service';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { ProductRatting } from '../models/product-ratting.model';

@Injectable({
    providedIn: 'root'
})

export class RattingManagerService extends ManagerService<ProductRatting> {
    includes: string[] = [];
    resourceEndPoint = 'product-rattings';
    pageSize = 10;
    normalize(item: HttpResponseItem<ProductRatting>): ProductRatting {
        item.attributes.id = item.id;
        item.attributes._type = item.type;
        this.register(item.attributes, false);
        return item.attributes;
    }
    saveIncludes(response: HttpResponse<any>): void {}
}
