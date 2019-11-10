import { Base } from 'src/app/model/_base.interface';

export interface DeliveryArea extends Base {
    delivery_area?: string;
    delivery_area_bn?: string;
    delivery_charge?: string;
    digital_center_id?: string;
}
