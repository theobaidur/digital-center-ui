import { AdminBaseService } from './admin-base.service';
import { OrderItem } from '../models/order-item.model';
import { Injectable } from '@angular/core';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { ProductService } from './product.service';
import { DigitalCenterEarningService } from './digital-center-earning.service';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { Base } from 'src/app/model/_base.interface';

@Injectable({
    providedIn: 'root'
})

export class OrderItemService extends AdminBaseService<OrderItem> {
    includes: string[] = ['product'];
    resourceEndPoint: string;
    normalize(item: HttpResponseItem<OrderItem>): OrderItem {
        item.attributes.id = item.id;
        item.attributes._type = item.type;
        // tslint:disable-next-line: no-string-literal
        if (item && item['relationships'] && item['relationships'].product
            // tslint:disable-next-line: no-string-literal
            && item['relationships'].product.data) {
                // tslint:disable-next-line: no-string-literal
                const data = item['relationships'].product.data;
                item.attributes.product = this.productService.fromCache(data.id);
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
                    case 'products':
                        this.productService.cache(data, false);
                        break;
                    default:
                        break;
                }
            });
        }
        this.digitalCenterService.notify();
        this.productService.notify();
    }

    constructor(
        private productService: ProductService,
        private digitalCenterService: DigitalCenterEarningService
    ) {
        super();
    }
}
