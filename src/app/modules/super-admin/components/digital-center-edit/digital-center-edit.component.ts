import { Component, OnInit } from '@angular/core';
import { DigitalCenter } from 'src/app/model/digital-center.interface';
import { LocationService } from 'src/app/modules/admin/services/location.service';
import { DigitalCenterService } from 'src/app/modules/admin/services/digital-center.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { map, switchMap, filter, distinctUntilChanged, tap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { FieldError } from 'src/app/interfaces/field-error.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-digital-center-edit',
  templateUrl: './digital-center-edit.component.html',
  styleUrls: ['./digital-center-edit.component.scss']
})
export class DigitalCenterEditComponent implements OnInit {
  errors: FieldError[] = [];
  model: DigitalCenter = {};
  modelChanged: Subject<DigitalCenter> = new Subject();
  logoChangeEvent: Event;
  bannerChangeEvent: Event;
  logo: string;
  banner: string;
  processing = false;
  constructor(
    private locationService: LocationService,
    private digitalCenterService: DigitalCenterService,
    private route: ActivatedRoute,
    private aleartService: SweetAlertService
  ) { }
  ngOnInit() {
    this.modelChanged.pipe(
      filter((model) => !!model),
      switchMap((model) => {
        if (!model.union_id) {
          return of(model);
        }
        return this.locationService.unions.pipe(
          filter(list => list.length > 0),
          map(list => {
            const union = list.find(item => item.id === model.union_id);
            if (union) {
              model.upazila_id = union.upazila_id;
            }
            return model;
          })
        );
      }),
      switchMap((model) => {
        if (!model.upazila_id) {
          return of(model);
        }
        return this.locationService.upazilas.pipe(
          filter(list => list.length > 0),
          map(list => {
            const upazila = list.find(item => item.id === model.upazila_id);
            if (upazila) {
              model.district_id = upazila.district_id;
            }
            return model;
          })
        );
      }),
      switchMap((model) => {
        if (!model.district_id) {
          return of(model);
        }
        return this.locationService.districts.pipe(
          filter(list => list.length > 0),
          map(list => {
            const district = list.find(item => item.id === model.district_id);
            if (district) {
              model.division_id = district.division_id;
            }
            return model;
          })
        );
      })
    ).subscribe(model => {
      this.model = model;
    });
    this.route.params
    .pipe(
      filter(params => !!params.id),
      map(params => params.id),
      distinctUntilChanged(),
      tap(() => this.aleartService.loading()),
      switchMap(id => this.digitalCenterService.get(id)),
      tap(() => this.aleartService.close())
    )
    .subscribe(center => {
      this.modelChanged.next(center);
    });
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

  get digitalCenters() {
    return this.digitalCenterService.all.pipe(
      map(list => (list || []).filter(each => each.id !== this.model.id))
    );
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

  divisionChanged() {
    this.model.district_id = null;
    this.model.upazila_id = null;
    this.model.union_id = null;
  }

  districtChanged() {
    this.model.upazila_id = null;
    this.model.union_id = null;
  }

  upazilaChanged() {
    this.model.union_id = null;
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

  get has_attachments() {
    return (this.logo || this.model.logo) && (this.banner || this.model.store_banner);
  }

  getErrors(field: string): string[] {
    return this.errors.map(error => error.detail)
    .filter(detail => !!detail)
    .map(detail => detail.split('|')).filter(parts => parts[0] === field).map(parts => parts[1]);
  }

  submit() {
    const form = new FormData();
    this.errors = [];
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
        contact_address_bn: this.model.contact_address_bn,
        email_address: this.model.email_address,
        phone_number: this.model.phone_number,
        phone_number_bn: this.model.phone_number_bn,
        youtube: this.model.youtube,
        facebook: this.model.facebook,
        twitter: this.model.twitter,
        affiliate_of: this.model.shop_affiliate_only ? this.model.affiliate_of : null
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
    this.digitalCenterService.update(this.model.id, form).subscribe(response => {
      this.aleartService.done();
    }, (err: HttpErrorResponse) => {
      if (err && err.error && err.error.errors) {
        this.errors = err.error.errors;
      }
      this.aleartService.failed();
    });
  }
}
