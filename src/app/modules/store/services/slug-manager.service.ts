import { Injectable } from '@angular/core';
import { Slug } from '../interfaces/slug.interface';
import { Repository } from '../../../interfaces/repository.interface';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpBase } from 'src/app/services/http.service';
import { ServiceLocator } from 'src/app/services/service-locator';
import { RequestParam } from 'src/app/interfaces/request-param.interface';

@Injectable({
    providedIn: 'root'
})
export class SlugManagerService {
    private repository: Repository<Slug> = {};
    private http: HttpBase;
    fetch(slug: string, type: string = null): Observable<Slug> {
        const filters: RequestParam[] = [{property: 'slug', value: slug}];
        if (type) {
            filters.push({property: 'type', value: type});
        }
        const url = this.http.toPath('utility/resolve-slug', [], filters);
        return this.http.httpService.get<Slug>(url).pipe(
            map(response => {
                if (response) {
                    this.register(response);
                    return response;
                }
                throw new Error(`${slug} not found`);
            })
        );
    }
    register({slug, id, type}: Slug) {
        this.repository[slug] = {slug, id, type};
    }
    resolve(slug: string, type?: string): Observable<Slug> {
        if (this.register[slug]) {
            return of(this.register[slug]);
        }
        return this.fetch(slug, type);
    }

    constructor() {
        this.http = ServiceLocator.injector.get(HttpBase);
    }

}
