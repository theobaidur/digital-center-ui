import { EarningType } from '../../admin/models/earning.model';
import { Base } from 'src/app/model/_base.interface';

export interface Due extends Base {
    earned_by?: string | 'earned-by-cns' | 'earned-by-customer';
    earning_type?: EarningType;
    total_due?: number;
    total_paid?: number;
}
