import { Base } from 'src/app/model/_base.interface';
import { User } from './user.model';
import { Address } from './address.model';
import { OrderItem } from './order-item.model';
import { DigitalCenter } from 'src/app/model/digital-center.interface';

export interface Order extends Base {
    customer_id?: string;
    order_id?: string;
    shipping_address_id?: string;
    digital_center_id?: string;
    shipping_note?: string;
    status?: 'pending' | 'verified' | 'confirmed' | 'shipped' | 'paid' | 'complete';
    confirmation_code?: string;
    cnsEarning?: number;
    affiliateEarning?: number;
    totalPrice?: number;
    seller_id?: string;
    customer?: User;
    address?: Address;
    items?: OrderItem[];
    seller?: DigitalCenter;
    digitalCenter?: DigitalCenter;
}
