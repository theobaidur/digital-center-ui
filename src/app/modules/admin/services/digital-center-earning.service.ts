import { AdminBaseService } from './admin-base.service';
import { DigitalCenterEarning } from '../models/digital-center-earning.model';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class DigitalCenterEarningService extends AdminBaseService<DigitalCenterEarning> {
    includes: string[] = [];
    resourceEndPoint = 'digital-center-earnings';
    normalize(item: HttpResponseItem<DigitalCenterEarning>): DigitalCenterEarning {
        item.attributes.id = item.id;
        item.attributes._type = item.type;
        this.cache(item.attributes, false);
        return item.attributes;
    }
    saveIncludes(response: HttpResponse<any>): void {}

    constructor() {
        super();
    }
}
