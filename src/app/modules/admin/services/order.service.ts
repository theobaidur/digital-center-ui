import { AdminBaseService } from './admin-base.service';
import { Order } from '../models/order.model';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { OrderItemService } from './order-item.service';
import { Base } from 'src/app/model/_base.interface';
import { AuthService } from './auth.service';
import { AddressService } from './address.service';
import { Injectable } from '@angular/core';
import { DigitalCenterService } from './digital-center.service';

@Injectable({
    providedIn: 'root'
})

export class OrderService extends AdminBaseService<Order> {
    includes: string[] = ['address', 'customer', 'seller' , 'items'];
    resourceEndPoint = 'orders';
    normalize(item: HttpResponseItem<Order>): Order {
        item.attributes.id = item.id;
        item.attributes._type = item.type;
        item.attributes.items = [];
        // tslint:disable-next-line: no-string-literal
        if (item && item['relationships'] && item['relationships'].items
            // tslint:disable-next-line: no-string-literal
            && Array.isArray(item['relationships'].items.data)) {
            // tslint:disable-next-line: no-string-literal
            item.attributes.items = item['relationships'].items.data.map(orderItem => {
                return this.orderItemService.fromCache(orderItem.id);
            });
        }

        // tslint:disable-next-line: no-string-literal
        if (item && item['relationships'] && item['relationships'].customer
            // tslint:disable-next-line: no-string-literal
            && item['relationships'].customer.data) {
                // tslint:disable-next-line: no-string-literal
                const data = item['relationships'].customer.data;
                item.attributes.customer = this.authService.fromCache(data.id);
        }

        // tslint:disable-next-line: no-string-literal
        if (item && item['relationships'] && item['relationships'].address
            // tslint:disable-next-line: no-string-literal
            && item['relationships'].address.data) {
                // tslint:disable-next-line: no-string-literal
                const data = item['relationships'].address.data;
                item.attributes.address = this.addressService.fromCache(data.id);
        }
        // tslint:disable-next-line: no-string-literal
        if (item && item['relationships'] && item['relationships'].seller
            // tslint:disable-next-line: no-string-literal
            && item['relationships'].seller.data) {
                // tslint:disable-next-line: no-string-literal
                const data = item['relationships'].seller.data;
                item.attributes.seller = this.digitalCenterService.fromCache(data.id);
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
                    case 'addresses':
                        this.addressService.cache(data, false);
                        break;
                    case 'users':
                        this.authService.cache(data, false);
                        break;
                    case 'order-items':
                        this.orderItemService.cache(data, false);
                        break;
                    case 'digital-centers':
                        this.digitalCenterService.cache(data, false);
                        break;
                    default:
                        break;
                }
            });
        }
        this.authService.notify();
        this.orderItemService.notify();
        this.addressService.notify();
        this.digitalCenterService.notify();
    }

    constructor(
        private orderItemService: OrderItemService,
        private authService: AuthService,
        private addressService: AddressService,
        private digitalCenterService: DigitalCenterService
    ) {
        super();
    }
}
