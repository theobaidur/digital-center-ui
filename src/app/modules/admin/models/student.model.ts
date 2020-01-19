import { Batch } from 'src/app/modules/admin/models/batch.model';
import { Base } from 'src/app/model/_base.interface';
import { DigitalCenter } from 'src/app/model/digital-center.interface';

export interface Student extends Base {
    name?: string;
    name_bn?: string;
    digital_center_id?: string;
    digitalCenter?: DigitalCenter;
    batches?: Batch[];
}
