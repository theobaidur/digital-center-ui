import { AdminBaseService } from './admin-base.service';
import { Upazila } from '../models/upazila';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class UpazilaService extends AdminBaseService<Upazila> {
    includes: string[] = [];
    resourceEndPoint = 'upazilas';
    normalize(item: HttpResponseItem<Upazila>): Upazila {
        const data = item.attributes;
        data._type = item.type;
        data.id = item.id;
        return data;
    }
    saveIncludes(response: HttpResponse<any>): void {}
}