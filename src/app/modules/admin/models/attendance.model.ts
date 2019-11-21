import { Base } from 'src/app/model/_base.interface';
import { Student } from './student.model';
import { Course } from './course.model';
import { Batch } from './batch.model';

export interface Attendance extends Base {
    student_id?: string;
    course_id?: string;
    batch_id?: string;
    digital_center_id?: string;
    day?: string;
    time?: string;
    present?: boolean;
    remark?: string;
    student?: Student;
    course?: Course;
    batch?: Batch;
}
