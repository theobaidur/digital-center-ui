import { AdminBaseService } from './admin-base.service';
import { Injectable } from '@angular/core';
import { HttpResponseItem } from '../../../interfaces/http-response-item.interface';
import { HttpResponse } from '../../../interfaces/http-response.interface';
import { GlobalSetting } from '../models/global-setting.model';
@Injectable({
    providedIn: 'root'
})

export class GlobalSettingService extends AdminBaseService<GlobalSetting> {
    includes: string[] = [];
    resourceEndPoint = 'global-settings';
    pageSize = -1;
    normalize(item: HttpResponseItem<GlobalSetting>): GlobalSetting {
        const data = item.attributes;
        data._type = item.type;
        data.id = item.id;
        this.cache(data, false);
        return data;
    }
    saveIncludes(response: HttpResponse<any>): void {}
    constructor() {
        super();
        this.getList().subscribe();
    }
}
