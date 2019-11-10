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
import { DeliveryAreaService } from './delivery-area.service';
import { EarningService } from './earning.service';
import { ServiceLocator } from 'src/app/services/service-locator';

@Injectable({
    providedIn: 'root'
})

export class OrderService extends AdminBaseService<Order> {
    includes: string[] = ['customer', 'deliveryArea', 'seller', 'items', 'digitalCenter', 'earnings'];
    resourceEndPoint = 'orders';
    earningService: EarningService;
    normalize(item: HttpResponseItem<Order>): Order {
        item.attributes.id = item.id;
        item.attributes._type = item.type;
        item.attributes.items = [];
        // tslint:disable-next-line: no-string-literal
        if (item && item['relationships'] && item['relationships'].earnings
            // tslint:disable-next-line: no-string-literal
            && Array.isArray(item['relationships'].earnings.data)) {
            // tslint:disable-next-line: no-string-literal
            item.attributes.earnings = item['relationships'].earnings.data.map(earning => {
                return this.earningService.fromCache(earning.id);
            });
        }

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
        if (item && item['relationships'] && item['relationships'].deliveryArea
            // tslint:disable-next-line: no-string-literal
            && item['relationships'].deliveryArea.data) {
                // tslint:disable-next-line: no-string-literal
                const data = item['relationships'].deliveryArea.data;
                item.attributes.deliveryArea = this.deliveryAreaService.fromCache(data.id);
        }
        // tslint:disable-next-line: no-string-literal
        if (item && item['relationships'] && item['relationships'].seller
            // tslint:disable-next-line: no-string-literal
            && item['relationships'].seller.data) {
                // tslint:disable-next-line: no-string-literal
                const data = item['relationships'].seller.data;
                item.attributes.seller = this.digitalCenterService.fromCache(data.id);
        }
        // tslint:disable-next-line: no-string-literal
        if (item && item['relationships'] && item['relationships'].digitalCenter
            // tslint:disable-next-line: no-string-literal
            && item['relationships'].digitalCenter.data) {
                // tslint:disable-next-line: no-string-literal
                const data = item['relationships'].digitalCenter.data;
                item.attributes.digitalCenter = this.digitalCenterService.fromCache(data.id);
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
                    case 'delivery-areas':
                        this.deliveryAreaService.cache(data, false);
                        break;
                    case 'users':
                        this.authService.cache(data, false);
                        break;
                    case 'earnings':
                        this.earningService.cache(data, false);
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
        this.deliveryAreaService.notify();
        this.digitalCenterService.notify();
    }

    constructor(
        private orderItemService: OrderItemService,
        private authService: AuthService,
        private deliveryAreaService: DeliveryAreaService,
        private digitalCenterService: DigitalCenterService
    ) {
        super();
        this.earningService = ServiceLocator.injector.get(EarningService);
    }
}
