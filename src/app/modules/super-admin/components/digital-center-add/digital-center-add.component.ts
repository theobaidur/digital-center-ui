import { Component, OnInit } from '@angular/core';
import { DigitalCenter } from 'src/app/model/digital-center.interface';
import { LocationService } from 'src/app/modules/admin/services/location.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DigitalCenterService } from 'src/app/modules/admin/services/digital-center.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';
import { FieldError } from 'src/app/interfaces/field-error.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-digital-center-add',
  templateUrl: './digital-center-add.component.html',
  styleUrls: ['./digital-center-add.component.scss']
})
export class DigitalCenterAddComponent implements OnInit {
  errors: FieldError[] = [];
  model: DigitalCenter = {
    has_shop: true,
    shop_affiliate_only: false,
    active: true
  };
  logoChangeEvent: Event;
  bannerChangeEvent: Event;
  logo: string;
  banner: string;
  processing = false;
  constructor(
    private locationService: LocationService,
    private digitalCenterService: DigitalCenterService,
    private router: Router,
    private aleartService: SweetAlertService
  ) { }

  ngOnInit() {
  }

  logoSelected(e: Event) {
    this.logoChangeEvent = e;
  }

  logoCropped(e: ImageCroppedEvent) {
    this.logo = e.base64;
  }
  bannerSelected(e: Event) {
    this.bannerChangeEvent = e;
  }

  bannerCropped(e: ImageCroppedEvent) {
    this.banner = e.base64;
  }

  get divisions() {
    return this.locationService.divisions.getValue();
  }

  get districts() {
    return this.locationService.districts.getValue()
    .filter(district => !this.model.division_id || district.division_id === this.model.division_id);
  }

  get upazilas() {
    return this.locationService.upazilas.getValue()
    .filter(upazila => !this.model.district_id || upazila.district_id === this.model.district_id);
  }

  get unions() {
    return this.locationService.unions.getValue()
    .filter(union => !this.model.upazila_id || union.upazila_id === this.model.upazila_id);
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
      attributes: {
        name: this.model.name,
        name_bn: this.model.name_bn,
        host: this.model.host,
        address: this.model.address,
        has_shop: this.model.has_shop,
        shop_affiliate_only: this.model.shop_affiliate_only,
        active: this.model.active,
        contact_address: this.model.contact_address,
        email_address: this.model.email_address,
        phone_number: this.model.phone_number,
        youtube: this.model.youtube,
        facebook: this.model.facebook,
        twitter: this.model.twitter
      }
    };
    if (this.model.union_id) {
      data.attributes.union_id = this.model.union_id;
    }
    if (this.model.upazila_id) {
      data.attributes.upazila_id = this.model.upazila_id;
    }
    form.append('data', JSON.stringify({data}));
    if (this.logo) {
      form.append('logo', this.toBlob(this.logo), 'logo.jpeg');
    }
    if (this.banner) {
      form.append('store_banner', this.toBlob(this.banner), 'store_banner.jpeg');
    }
    this.aleartService.saving();
    this.digitalCenterService.post(form).subscribe(response => {
      this.aleartService.done();
      this.router.navigate(['/super-admin/digital-center-edit', response.id]);
    }, (err: HttpErrorResponse) => {
      if (err && err.error && err.error.errors) {
        this.errors = err.error.errors;
      }
      this.aleartService.failed();
    });
  }
}
