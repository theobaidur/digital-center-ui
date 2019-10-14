import { Base } from 'src/app/model/_base.interface';

export interface ShippingCharge extends Base {
    location?: string;
    location_bn?: string;
    charge?: number;
    digital_center_id?: string;
}
