import { AdminBaseService } from './admin-base.service';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { Injectable } from '@angular/core';
import { Result } from '../models/result.model';
import { StudentService } from './student.service';
import { BatchService } from './batch.service';
import { CourseService } from './course.service';
import { Base } from 'src/app/model/_base.interface';

@Injectable({
    providedIn: 'root'
})

export class ResultService extends AdminBaseService<Result> {
    includes: string[] = ['student', 'batch', 'course'];
    resourceEndPoint = 'results';
    normalize(item: HttpResponseItem<Result>): Result {
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
        // tslint:disable-next-line: no-string-literal
        if (item && item['relationships'] && item['relationships'].batch
            // tslint:disable-next-line: no-string-literal
            && item['relationships'].batch.data) {
                // tslint:disable-next-line: no-string-literal
                const batch = item['relationships'].batch.data;
                data.batch = this.batchService.fromCache(batch.id);
        }
        // tslint:disable-next-line: no-string-literal
        if (item && item['relationships'] && item['relationships'].course
            // tslint:disable-next-line: no-string-literal
            && item['relationships'].course.data) {
                // tslint:disable-next-line: no-string-literal
                const course = item['relationships'].course.data;
                data.course = this.studentService.fromCache(course.id);
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
                    case 'batches':
                        this.batchService.cache(data, false);
                        break;
                    case 'courses':
                        this.courseService.cache(data, false);
                        break;
                    default:
                        break;
                }
            });
        }
        this.studentService.notify();
        this.batchService.notify();
        this.courseService.notify();
    }
    constructor(
        private studentService: StudentService,
        private batchService: BatchService,
        private courseService: CourseService
    ) {super(); }
}
