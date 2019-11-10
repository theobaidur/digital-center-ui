import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { ManagerService } from './manager-base.service';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { Attachment } from '../models/attachment.model';
import { RequestParam } from 'src/app/interfaces/request-param.interface';

@Injectable({
    providedIn: 'root'
})

export class ProductManagerService extends ManagerService<Product> {
    includes: string[] = ['attachments'];
    resourceEndPoint = 'products';
    pageSize = 30;
    defatulFilters: RequestParam[] = [
        {property: 'filter[product_status]', value: '!eq,out_of_stock'}
    ];
    normalize(item: HttpResponseItem<Product>): Product {
        item.attributes.id = item.id;
        item.attributes._type = item.type;
        // tslint:disable-next-line: no-string-literal
        if (item && item['relationships'] && item['relationships'].attachments
        // tslint:disable-next-line: no-string-literal
        && Array.isArray(item['relationships'].attachments.data)) {
            // tslint:disable-next-line: no-string-literal
            item['relationships'].attachments.data.forEach(attachment => {
                const info: Attachment = this.attachmentManager.getOrDefault(attachment.id);
                item.attributes.product_image = info.id;
            });
        }
        this.register(item.attributes, false);
        return item.attributes;
    }
    saveIncludes(response: HttpResponse<any>): void {
        if (response && response.included && Array.isArray(response.included)) {
            response.included.forEach(item => {
                if (item && item.type && item.id && item.attributes) {
                    const attachment: Attachment = item.attributes;
                    attachment.id = item.id;
                    attachment._type = item.type;
                    this.attachmentManager.register(attachment, false);
                }
            });
        }
        this.attachmentManager.notify();
    }

    get_special_products() {
        return this.getPage(1, [{
            property: 'filter[show_in_gallery]',
            value: 'eq,1'
        }]);
    }
}
