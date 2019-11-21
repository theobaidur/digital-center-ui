import { AdminBaseService } from './admin-base.service';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { Injectable } from '@angular/core';
import { Payment } from '../models/payment.model';
import { Teacher } from '../models/teacher.model';

@Injectable({
    providedIn: 'root'
})

export class TeacherService extends AdminBaseService<Teacher> {
    includes: string[] = [];
    resourceEndPoint = 'teachers';
    normalize(item: HttpResponseItem<Teacher>): Teacher {
        const data = item.attributes;
        data._type = item.type;
        data.id = item.id;
        this.cache(data, false);
        return data;
    }
    saveIncludes(response: HttpResponse<any>): void {}
}
