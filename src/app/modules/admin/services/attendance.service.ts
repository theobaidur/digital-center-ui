import { AdminBaseService } from './admin-base.service';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { Injectable } from '@angular/core';
import { Attendance } from '../models/attendance.model';
import { StudentService } from './student.service';
import { Base } from 'src/app/model/_base.interface';

@Injectable({
    providedIn: 'root'
})

export class AttendanceService extends AdminBaseService<Attendance> {
    includes: string[] = ['student'];
    resourceEndPoint = 'attendances';
    normalize(item: HttpResponseItem<Attendance>): Attendance {
        const data = item.attributes;
        data._type = item.type;
        data.id = item.id;
        // tslint:disable-next-line: no-string-literal
        if (item && item['relationships'] && item['relationships'].student
            // tslint:disable-next-line: no-string-literal
            && item['relationships'].student.data) {
                // tslint:disable-next-line: no-string-literal
                const student = item['relationships'].student.data;
                data.student = this.studentService.fromCache(student.id);
        }
        this.cache(data, false);
        return data;
    }
    saveIncludes(response: HttpResponse<any>): void {
        if (response && Array.isArray(response.included)) {
            response.included.forEach(include => {
                const data: Base = include.attributes;
                data.id = include.id;
                data._type = include.type;
                switch (include.type) {
                    case 'students':
                        this.studentService.cache(data, false);
                        break;
                    default:
                        break;
                }
            });
        }
        this.studentService.notify();
    }

    constructor(
        private studentService: StudentService
    ) {
        super();
    }
}
