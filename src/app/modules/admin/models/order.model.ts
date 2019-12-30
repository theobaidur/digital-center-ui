import { Base } from 'src/app/model/_base.interface';
import { User } from './user.model';
import { Address } from './address.model';
import { OrderItem } from './order-item.model';
import { DigitalCenter } from 'src/app/model/digital-center.interface';
import { Earning } from './earning.model';

export interface Order extends Base {
    customer_id?: string;
    order_id?: string;
    delivery_area_id?: string;
    delivery_address?: string;
    digital_center_id?: string;
    delivery_charge?: number;
    status?: 'pending' | 'verified' | 'confirmed' | 'shipped' | 'paid' | 'complete' | 'cancelled';
    confirmation_code?: string;
    cnsEarning?: number;
    affiliateEarning?: number;
    totalPrice?: number;
    seller_id?: string;
    customer?: User;
    items?: OrderItem[];
    earnings?: Earning[];
    seller?: DigitalCenter;
    digitalCenter?: DigitalCenter;
}
