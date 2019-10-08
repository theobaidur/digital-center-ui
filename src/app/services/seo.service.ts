import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoData } from '../interfaces/seo-data.interface';
import { AttachmentManagerService } from '../modules/store/services/attachment-manager.service';

@Injectable({
    providedIn: 'root'
})
export class SeoService {
    constructor(private meta: Meta, private title: Title, private attachmentService: AttachmentManagerService) {}
    updateTag(data: SeoData) {
        data = {
            prefix: 'DeshiPonno',
            title: 'DeshiPonno',
            withPrefix: true,
            description: 'Collection of authentic local products in Bangladesh',
            image: '/assets/logo.png',
            url: '/',
            ...data
        };

        if (data.withPrefix && data.prefix) {
            data.title = `${data.prefix} | ${data.title}`;
        }
        if (this.attachmentService.exists(data.image)) {
            data.image = this.attachmentService.getOrDefault(data.image).url;
        }
        console.log('SEO::', data);
        this.title.setTitle(data.title);
        this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
        this.meta.updateTag({ name: 'twitter:site', content: '@deshiponno' });
        this.meta.updateTag({ name: 'twitter:title', content: data.title });
        this.meta.updateTag({ name: 'twitter:description', content: data.description });
        this.meta.updateTag({ name: 'twitter:image', content: data.image });

        this.meta.updateTag({ property: 'og:type', content: 'article' });
        this.meta.updateTag({ property: 'og:site_name', content: 'DeshiPonno' });
        this.meta.updateTag({ property: 'og:title', content: data.title });
        this.meta.updateTag({ property: 'og:description', content: data.description });
        this.meta.updateTag({ property: 'og:image', content: data.image });
        this.meta.updateTag({ property: 'og:url', content: `${data.url}` });
    }
}
