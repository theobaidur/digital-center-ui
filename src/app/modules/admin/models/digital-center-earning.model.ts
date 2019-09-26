import { Base } from 'src/app/model/_base.interface';
import { DigitalCenter } from 'src/app/model/digital-center.interface';
import { OrderItem } from './order-item.model';

export interface DigitalCenterEarning extends Base {
    digital_center_id?: string;
    order_item_id?: string;
    earning_type?: 'CNS_CHARGE' | 'AFFILIATE_CHARGE' | 'OWNER_EARNING';
    amount?: string;
    status?: 'PROCESSING' | 'PAID' | 'COMPLETE';
    digitalCenter?: DigitalCenter;
    orderItem?: OrderItem;
}
