import { Base } from 'src/app/model/_base.interface';
import { Order } from './order.model';
import { Product } from './product.model';
import { DigitalCenter } from 'src/app/model/digital-center.interface';

export interface OrderItem extends Base {
    order_id?: string;
    product_id?: string;
    product_unit?: string;
    unit_price?: number;
    quantity?: number;
    order?: Order;
    product?: Product;
}
