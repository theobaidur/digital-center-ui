import { AdminBaseService } from './admin-base.service';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { BatchService } from './batch.service';
import { Base } from '../../../model/_base.interface';

@Injectable({
    providedIn: 'root'
})

export class StudentService extends AdminBaseService<Student> {
    includes: string[] = ['batches'];
    resourceEndPoint = 'students';
    normalize(item: HttpResponseItem<Student>): Student {
        item.attributes.id = item.id;
        item.attributes._type = item.type;
        item.attributes.items = [];
        // tslint:disable-next-line: no-string-literal
        if (item && item['relationships'] && item['relationships'].batches
            // tslint:disable-next-line: no-string-literal
            && Array.isArray(item['relationships'].batches.data)) {
            // tslint:disable-next-line: no-string-literal
            item.attributes.batches = item['relationships'].batches.data.map(batch => {
                return this.batchService.fromCache(batch.id);
            });
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
                    case 'batches':
                        this.batchService.cache(data, false);
                        break;
                    default:
                        break;
                }
            });
        }
        this.batchService.notify();
    }

    constructor(
        private batchService: BatchService
    ){
        super();
    }

}
