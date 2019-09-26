import { AdminBaseService } from './admin-base.service';
import { Division } from '../models/division.model';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class DivisionService extends AdminBaseService<Division> {
    includes: string[] = [];
    resourceEndPoint = 'divisions';
    normalize(item: HttpResponseItem<Division>): Division {
        const data = item.attributes;
        data._type = item.type;
        data.id = item.id;
        return data;
    }
    saveIncludes(response: HttpResponse<any>): void {}
}
