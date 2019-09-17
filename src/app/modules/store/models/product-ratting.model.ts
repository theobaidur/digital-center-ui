import { Base } from 'src/app/model/_base.interface';

export interface ProductRatting extends Base {
    product_id?: string;
    ratting?: number;
    comment?: string;
}
