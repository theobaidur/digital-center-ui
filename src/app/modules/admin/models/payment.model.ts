import { Base } from 'src/app/model/_base.interface';

export interface Payment extends Base {
    paid_by?: string;
    paid_to?: string;
    amount?: number;
}
