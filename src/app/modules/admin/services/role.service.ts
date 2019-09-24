import { AdminBaseService } from './admin-base.service';
import { Role } from '../models/role.model';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RoleService extends AdminBaseService<Role> {
    includes: string[] = [];
    resourceEndPoint = 'roles';
    pageSize = -1;
    normalize(item: HttpResponseItem<Role>): Role {
        const role = item.attributes;
        role.id = item.id;
        role._type = item.type;
        this.cache(role, false);
        return role;
    }
    saveIncludes(response: HttpResponse<any>): void {}
    constructor() {
        super();
        this.getList().subscribe(console.log);
    }
}
