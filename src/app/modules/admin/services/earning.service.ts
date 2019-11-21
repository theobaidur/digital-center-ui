import { AdminBaseService } from './admin-base.service';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { Injectable } from '@angular/core';
import { Earning } from '../models/earning.model';
import { OrderService } from './order.service';
import { Base } from 'src/app/model/_base.interface';
import { ServiceLocator } from 'src/app/services/service-locator';

@Injectable({
    providedIn: 'root'
})

export class EarningService extends AdminBaseService<Earning> {
    includes: string[] = ['order'];
    resourceEndPoint = 'earnings';
    orderService: any;
    initializeService(): OrderService {
        if (!this.orderService) {
            this.orderService = ServiceLocator.injector.get(OrderService);
        }
        return this.orderService;
    }
    normalize(item: HttpResponseItem<Earning>): Earning {
        item.attributes.id = item.id;
        item.attributes._type = item.type;
        // tslint:disable-next-line: no-string-literal
        if (item && item['relationships'] && item['relationships'].order
            // tslint:disable-next-line: no-string-literal
            && item['relationships'].order.data) {
                // tslint:disable-next-line: no-string-literal
                const data = item['relationships'].order.data;
                item.attributes.order = this.initializeService().fromCache(data.id);
        }
        this.cache(item.attributes, false);
        return item.attributes;
    }
    saveIncludes(response: HttpResponse<any>): void {
        if (response && Array.isArray(response.included)) {
            response.included.forEach(include => {
                const data: Base = include.attributes;
                data.id = include.id;
                data._type = include.type;
                switch (include.type) {
                    case 'orders':
                        this.initializeService().cache(data, false);
                        break;
                    default:
                        break;
                }
            });
        }
        this.initializeService().notify();
    }

    constructor(
    ) {
        super();
    }
}
