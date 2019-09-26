import { Component, OnInit } from '@angular/core';
import { DigitalCenter } from 'src/app/model/digital-center.interface';
import { LocationService } from 'src/app/modules/admin/services/location.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DigitalCenterService } from 'src/app/modules/admin/services/digital-center.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';

@Component({
  selector: 'app-digital-center-add',
  templateUrl: './digital-center-add.component.html',
  styleUrls: ['./digital-center-add.component.scss']
})
export class DigitalCenterAddComponent implements OnInit {
  model: DigitalCenter = {};
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
    .filter(union => !this.model.union_id || union.upazila_id === this.model.upazila_id);
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

  submit() {
    const form = new FormData();
    const data = {
      type: 'digital-centers',
      attributes: {...this.model}
    };
    form.append('data', JSON.stringify({data}));
    form.append('logo', this.toBlob(this.logo), 'logo.jpeg');
    form.append('store_banner', this.toBlob(this.banner), 'store_banner.jpeg');
    this.aleartService.saving();
    this.digitalCenterService.post(form).subscribe(response => {
      this.aleartService.done();
      this.router.navigate(['/super-admin/digital-center-edit', response.id]);
    }, () => this.aleartService.failed());
  }
}