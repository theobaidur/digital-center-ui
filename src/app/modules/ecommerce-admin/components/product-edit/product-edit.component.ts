import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modules/admin/models/product.model';
import { ProductService } from 'src/app/modules/admin/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';
import { CategoryService } from 'src/app/modules/admin/services/category.service';
import { AuthService } from 'src/app/modules/admin/services/auth.service';
import { filter, map, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Roles } from 'src/app/enums/roles.enum';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  model: Product = {};
  primaryImageChangeEvent: Event;
  primaryImageThumbChangeEvent: Event;
  productImagesChangeEvent: Event;
  primaryImage: string;
  primaryImageThumb: string;
  productImages: string;
  constructor(
    private dataService: ProductService,
    private aleartService: SweetAlertService,
    private categoryService: CategoryService,
    private authService: AuthService,
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
    ).subscribe(data => this.model = data);
  }

  primaryImageSelected(e: Event) {
    this.primaryImageChangeEvent = e;
  }
  primaryImageThumbSelected(e: Event) {
    this.primaryImageThumbChangeEvent = e;
  }
  productImagesSelected(e: Event) {
    this.productImagesChangeEvent = e;
  }

  primaryImageCropped(e: ImageCroppedEvent) {
    this.primaryImage = e.base64;
  }
  primaryImageThumbCropped(e: ImageCroppedEvent) {
    this.primaryImageThumb = e.base64;
  }
  productImagesCropped(e: ImageCroppedEvent) {
    this.productImages = e.base64;
  }

  categories() {
    return this.categoryService.all;
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

  get hasAdditionalData() {
    return (this.model.primary_image || this.primaryImage)
    && (this.model.primary_image_thumb || this.primaryImageThumb)
    && (!this.model.promotion_running || this.model.regular_unit_price);
  }

  get isSuperAdmin() {
    if (this.authService.hasRole(Roles.SUPER_ADMIN)) {
      return true;
    }
  }

  get canEdit() {
    if (this.authService.hasRole(Roles.ROLE_ECOMMERCE_ADMIN) && this.authService.isAdminOf(this.model.digital_center_id)) {
      return true;
    }
    if (this.isSuperAdmin) {
      return true;
    }
    return false;
  }

  toggleApprove() {
    if (this.isSuperAdmin) {
      this.aleartService.saving('Updating...');
      const data = {
        type: 'products',
        id: this.model.id
      };
      this.dataService.update(this.model.id, {data}, `products/toggle-approve`).subscribe(response => {
        this.model = response;
        this.aleartService.done();
      }, () => this.aleartService.failed());
    }
  }

  submit() {
    const form = new FormData();
    this.model.digital_center_id = this.authService.authState.getValue().digital_center_id;
    const data = {
      type: 'products',
      id: this.model.id,
      attributes: {
        name: this.model.name,
        name_bn: this.model.name_bn,
        short_description: this.model.short_description,
        short_description_bn: this.model.short_description_bn,
        related_name: this.model.related_name,
        related_name_bn: this.model.related_name_bn,
        description: this.model.description,
        description_bn: this.model.description_bn,
        unit_price: this.model.unit_price,
        product_unit: this.model.product_unit,
        category_id: this.model.category_id,
        product_status: this.model.product_status,
        regular_unit_price: this.model.regular_unit_price,
        promotion_running: this.model.promotion_running,
        show_in_gallery: this.model.show_in_gallery
      }
    };
    form.append('data', JSON.stringify({data}));
    if (this.primaryImage) {
      form.append('primary_image', this.toBlob(this.primaryImage), 'primary_image.jpeg');
    }
    if (this.primaryImageThumb) {
      form.append('primary_image_thumb', this.toBlob(this.primaryImageThumb), 'primary_image_thumb.jpeg');
    }
    if (this.productImages) {
      form.append('product_images', this.toBlob(this.productImages), 'product_images.jpeg');
    }
    this.aleartService.saving();
    this.dataService.update(this.model.id, form).subscribe(response => {
      this.aleartService.done();
    }, () => this.aleartService.failed());
  }

}
