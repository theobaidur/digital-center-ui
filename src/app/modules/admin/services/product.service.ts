import { AdminBaseService } from './admin-base.service';
import { Product } from '../models/product.model';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { AttachmentService } from './attachment.service';
import { CategoryService } from './category.service';
import { DigitalCenterService } from './digital-center.service';
import { Attachment } from '../../store/models/attachment.model';
import { Base } from 'src/app/model/_base.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProductService extends AdminBaseService<Product> {
    includes: string[] = ['attachments', 'category', 'digitalCenter'];
    resourceEndPoint = 'products';
    normalize(item: HttpResponseItem<Product>): Product {
        item.attributes.id = item.id;
        item.attributes._type = item.type;
        // tslint:disable-next-line: no-string-literal
        if (item && item['relationships'] && item['relationships'].attachments
            // tslint:disable-next-line: no-string-literal
            && Array.isArray(item['relationships'].attachments.data)) {
            // tslint:disable-next-line: no-string-literal
            item['relationships'].attachments.data.forEach(attachment => {
                const info: Attachment = this.attachmentService.fromCache(attachment.id);
                if (info) {
                    item.attributes[info.group] = info.id;
                }
            });
        }

        // tslint:disable-next-line: no-string-literal
        if (item && item['relationships'] && item['relationships'].category
            // tslint:disable-next-line: no-string-literal
            && item['relationships'].category.data) {
                // tslint:disable-next-line: no-string-literal
                const data = item['relationships'].category.data;
                item.attributes.category = this.categoryService.fromCache(data.id);
        }

        // tslint:disable-next-line: no-string-literal
        if (item && item['relationships'] && item['relationships'].digitalCenter
            // tslint:disable-next-line: no-string-literal
            && item['relationships'].digitalCenter.data) {
                // tslint:disable-next-line: no-string-literal
                const data = item['relationships'].digitalCenter.data;
                item.attributes.digital_center = this.digitalCenterService.fromCache(data.id);
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
                    case 'attachments':
                        this.attachmentService.cache(data, false);
                        break;
                    case 'categories':
                        this.categoryService.cache(data, false);
                        break;
                    case 'digital-centers':
                        this.digitalCenterService.cache(data, false);
                        break;
                    default:
                        break;
                }
            });
        }
        this.attachmentService.notify();
        this.categoryService.notify();
        this.digitalCenterService.notify();
    }

    constructor(
        private attachmentService: AttachmentService,
        private categoryService: CategoryService,
        private digitalCenterService: DigitalCenterService
    ) {
        super();
    }
}
