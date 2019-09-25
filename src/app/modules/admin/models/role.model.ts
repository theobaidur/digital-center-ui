import { Base } from 'src/app/model/_base.interface';
import { Roles } from 'src/app/enums/roles.enum';

export interface Role extends Base {
    name?: Roles;
}
