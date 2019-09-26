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
    normalize(item: HttpResponseItem<Union>): Union {
        const data = item.attributes;
        data._type = item.type;
        data.id = item.id;
        return data;
    }
    saveIncludes(response: HttpResponse<any>): void {}
}
