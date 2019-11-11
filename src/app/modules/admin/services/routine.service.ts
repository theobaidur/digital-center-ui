import { AdminBaseService } from './admin-base.service';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { Injectable } from '@angular/core';
import { Payment } from '../models/payment.model';
import { Routine } from '../models/routine.model';

@Injectable({
    providedIn: 'root'
})

export class RoutineService extends AdminBaseService<Routine> {
    includes: string[] = [];
    resourceEndPoint = 'routines';
    normalize(item: HttpResponseItem<Routine>): Routine {
        const data = item.attributes;
        data._type = item.type;
        data.id = item.id;
        this.cache(data, false);
        return data;
    }
    saveIncludes(response: HttpResponse<any>): void {}
}
