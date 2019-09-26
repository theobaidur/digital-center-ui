import { AdminBaseService } from './admin-base.service';
import { District } from '../models/district.model';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DistrictService extends AdminBaseService<District> {
    includes: string[] = [];
    resourceEndPoint = 'districts';
    normalize(item: HttpResponseItem<District>): District {
        const data = item.attributes;
        data._type = item.type;
        data.id = item.id;
        return data;
    }
    saveIncludes(response: HttpResponse<any>): void {}
}
