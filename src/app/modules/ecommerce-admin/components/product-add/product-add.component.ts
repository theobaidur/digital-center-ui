import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modules/admin/models/product.model';
import { AuthService } from 'src/app/modules/admin/services/auth.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CategoryService } from 'src/app/modules/admin/services/category.service';
import { ProductService } from 'src/app/modules/admin/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  model: Product = {};
  primaryImageChangeEvent: Event;
  primaryImageThumbChangeEvent: Event;
  productImagesChangeEvent: Event;
  primaryImage: string;
  primaryImageThumb: string;
  productImages: string;
  constructor(
    private dataService: ProductService,
    private router: Router,
    private aleartService: SweetAlertService,
    private categoryService: CategoryService,
    private authService: AuthService
  ) { }

  ngOnInit() {}

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

  submit() {
    const form = new FormData();
    this.model.digital_center_id = this.authService.authState.getValue().digital_center_id;
    const data = {
      type: 'products',
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
    this.dataService.post(form).subscribe(response => {
      this.aleartService.done();
      this.router.navigate(['/ecommerce-admin/product-edit', response.id]);
    }, () => this.aleartService.failed());
  }

}
