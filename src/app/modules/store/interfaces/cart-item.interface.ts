import { Product } from '../models/product.model';

export interface CartItem extends Product {
    quantity?: number;
}
