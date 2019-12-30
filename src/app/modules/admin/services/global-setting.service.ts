import { AdminBaseService } from './admin-base.service';
import { Injectable } from '@angular/core';
import { HttpResponseItem } from '../../../interfaces/http-response-item.interface';
import { HttpResponse } from '../../../interfaces/http-response.interface';
import { GlobalSetting } from '../models/global-setting.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    post(data: any, endpoint: string = null): Observable<GlobalSetting> {
        return this.http.post<HttpResponseItem<GlobalSetting>[]>(`${endpoint || this.resourceEndPoint}`, data, this.includes).pipe(
            map(response => {
                if (!this.dataLoaded.getValue()) {
                    this.dataLoaded.next(true);
                }
                this.saveIncludes(response);
                const list = response.data.map(item => this.normalize(item));
                const meta = response.meta;
                this.notify();
                return {list, meta};
            })
        );
    }
    constructor() {
        super();
        this.getList().subscribe();
    }
}
