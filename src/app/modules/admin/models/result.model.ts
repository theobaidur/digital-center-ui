import { Base } from 'src/app/model/_base.interface';
import { Course } from './course.model';
import { Batch } from './batch.model';
import { Student } from './student.model';
import { DigitalCenter } from 'src/app/model/digital-center.interface';

export interface Result extends Base {
    course_id?: string;
    batch_id?: string;
    student_id?: string;
    digital_center_id?: string;
    total_mark?: number;
    mark_obtained?: number;
    remark?: string;

    course?: Course;
    batch?: Batch;
    student?: Student;
    digitalCenter?: DigitalCenter;
}
