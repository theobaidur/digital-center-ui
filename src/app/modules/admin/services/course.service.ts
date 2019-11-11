import { AdminBaseService } from './admin-base.service';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { Injectable } from '@angular/core';
import { Payment } from '../models/payment.model';
import { Course } from '../models/course.model';

@Injectable({
    providedIn: 'root'
})

export class CourseService extends AdminBaseService<Course> {
    includes: string[] = [];
    resourceEndPoint = 'courses';
    pageSize = -1;
    normalize(item: HttpResponseItem<Course>): Course {
        const data = item.attributes;
        data._type = item.type;
        data.id = item.id;
        this.cache(data, false);
        return data;
    }
    saveIncludes(response: HttpResponse<any>): void {}
}
