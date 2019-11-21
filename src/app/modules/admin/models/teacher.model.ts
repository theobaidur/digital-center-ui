import { Base } from 'src/app/model/_base.interface';
import { DigitalCenter } from 'src/app/model/digital-center.interface';

export interface Teacher extends Base {
    name?: string;
    name_bn?: string;
    digital_center_id?: string;
    digitalCenter?: DigitalCenter;
}
