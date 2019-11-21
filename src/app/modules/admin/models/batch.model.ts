import { Base } from 'src/app/model/_base.interface';
import { Student } from './student.model';
import { Course } from './course.model';
import { Result } from './result.model';
import { DigitalCenter } from 'src/app/model/digital-center.interface';

export interface Batch extends Base {
    title?: string;
    title_bn?: string;
    digital_center_id?: string;
    students?: Student[];
    courses?: Course[];
    results?: Result[];
    digitalCenter?: DigitalCenter;
}
