import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/modules/admin/models/category.model';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CategoryService } from 'src/app/modules/admin/services/category.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  model: Category = {};
  iconChangeEvent: Event;
  thumbChangeEvent: Event;
  bannerChangeEvent: Event;
  categoryIcon: string;
  categoryThumb: string;
  categoryBanner: string;
  constructor(
    private dataService: CategoryService,
    private router: Router,
    private aleartService: SweetAlertService
  ) { }

  ngOnInit() {
  }

  iconSelected(e: Event) {
    this.iconChangeEvent = e;
  }
  thumbSelected(e: Event) {
    this.thumbChangeEvent = e;
  }
  bannerSelected(e: Event) {
    this.bannerChangeEvent = e;
  }

  iconCropped(e: ImageCroppedEvent) {
    this.categoryIcon = e.base64;
  }
  thumbCropped(e: ImageCroppedEvent) {
    this.categoryThumb = e.base64;
  }
  bannerCropped(e: ImageCroppedEvent) {
    this.categoryBanner = e.base64;
  }

  parents() {
    return this.dataService.all.pipe(
      map(list => list.filter(item => !this.model.id || item.id !== this.model.id)),
    );
  }

  toBlob(dataURI: string) {
    let byteString: string;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1]);
    } else {
        byteString = unescape(dataURI.split(',')[1]);
    }

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
  }

  get hasAttachments() {
    return (this.model.category_icon || this.categoryIcon)
    && (this.model.category_thumb || this.categoryThumb)
    && (this.model.category_banner || this.categoryBanner);
  }

  submit() {
    const form = new FormData();
    const data = {
      type: 'digital-centers',
      attributes: {...this.model}
    };
    form.append('data', JSON.stringify({data}));
    if (this.categoryIcon) {
      form.append('category_icon', this.toBlob(this.categoryIcon), 'category_icon.jpeg');
    }
    if (this.categoryThumb) {
      form.append('category_thumb', this.toBlob(this.categoryThumb), 'category_thumb.jpeg');
    }
    if (this.categoryBanner) {
      form.append('category_banner', this.toBlob(this.categoryBanner), 'category_banner.jpeg');
    }
    this.aleartService.saving();
    this.dataService.post(form).subscribe(response => {
      this.aleartService.done();
      this.router.navigate(['/super-admin/category-edit', response.id]);
    }, () => this.aleartService.failed());
  }

}
