import { Base } from 'src/app/model/_base.interface';
import { User } from './user.model';
import { Address } from './address.model';
import { OrderItem } from './order-item.model';
import { DigitalCenter } from 'src/app/model/digital-center.interface';

export interface Order extends Base {
    customer_id?: string;
    shipping_address_id?: string;
    shipping_note?: string;
    status?: 'pending' | 'verified' | 'confirmed' | 'shipped' | 'paid' | 'complete';
    confirmation_code?: string;
    customer?: User;
    address?: Address;
    seller_id?: string;
    items?: OrderItem[];
    seller?: DigitalCenter;
}
