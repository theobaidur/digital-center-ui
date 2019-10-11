import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/modules/admin/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { map, filter, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Category } from 'src/app/modules/admin/models/category.model';
import { FieldError } from 'src/app/interfaces/field-error.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {
  errors: FieldError[] = [];
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
    private aleartService: SweetAlertService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      filter(params => params.id),
      map(params => params.id),
      distinctUntilChanged(),
      tap(() => this.aleartService.loading()),
      switchMap(id => this.dataService.get(id)),
      tap(() => this.aleartService.close()),
    ).subscribe(category => this.model = category);
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

  getErrors(field: string): string[] {
    return this.errors.map(error => error.detail)
    .filter(detail => !!detail)
    .map(detail => detail.split('|')).filter(parts => parts[0] === field).map(parts => parts[1]);
  }

  submit() {
    this.errors = [];
    const form = new FormData();
    const data: any = {
      type: 'digital-centers',
      id: this.model.id,
      attributes: {
        name: this.model.name,
        name_bn: this.model.name_bn,
        related_name: this.model.related_name,
        related_name_bn: this.model.related_name_bn,
        cns_charge: this.model.cns_charge,
        affiliate_charge: this.model.affiliate_charge,
        charge_type: this.model.charge_type,
        parent_id: this.model.parent_id
      }
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
    this.dataService.update(this.model.id, form).subscribe(response => {
      this.aleartService.done();
    }, (err: HttpErrorResponse) => {
      if (err && err.error && err.error.errors) {
        this.errors = err.error.errors;
      }
      this.aleartService.failed();
    });
  }

}
