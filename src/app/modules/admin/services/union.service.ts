import { AdminBaseService } from './admin-base.service';
import { Union } from '../models/union';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class UnionService extends AdminBaseService<Union> {
    includes: string[] = [];
    resourceEndPoint = 'unions';
    pageSize = -1;
    normalize(item: HttpResponseItem<Union>): Union {
        const data = item.attributes;
        data._type = item.type;
        data.id = item.id;
        this.cache(data, false);
        return data;
    }
    saveIncludes(response: HttpResponse<any>): void {}
    constructor() {
        super();
        this.getList().subscribe();
    }
}
