import { Base } from 'src/app/model/_base.interface';
import { Batch } from './batch.model';
import { Course } from './course.model';
import { DigitalCenter } from 'src/app/model/digital-center.interface';

export interface Routine extends Base {
    batch_id?: string;
    course_id?: string;
    digital_center_id?: string;
    day?: string;
    time?: string;
    location?: string;
    remark?: string;

    batch?: Batch;
    course?: Course;
    digitalCenter?: DigitalCenter;
}
