import { Base } from 'src/app/model/_base.interface';

export type EarningType = 'sales' | 'sales-return' | 'sales-commision' |
'sales-commision-return' | 'affilate-commision' | 'affilate-commision-return' | 'delivery-charge';

export interface Earning extends Base {
    earned_by?: string | 'earned-by-cns' | 'earned-by-customer';
    earning_type?: EarningType;
    order_id?: string;
    amount?: number;
}
