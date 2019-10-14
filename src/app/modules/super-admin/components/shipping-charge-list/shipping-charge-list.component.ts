import { Component, OnInit, Input } from '@angular/core';
import { ShippingCharge } from 'src/app/modules/admin/models/shipping-charge.model';
import { ShippingChargeService } from 'src/app/modules/admin/services/shipping-charge.service';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';

@Component({
  selector: 'app-shipping-charge-list',
  templateUrl: './shipping-charge-list.component.html',
  styleUrls: ['./shipping-charge-list.component.scss']
})
export class ShippingChargeListComponent implements OnInit {
  @Input() digitalCenterId: string;
  list: ShippingCharge[] = [];
  loading = false;
  ngOnInit(): void {
    if (this.digitalCenterId) {
      this.loading = true;
      this.dataService.getList(1, [{property: `filter[digital_center_id]`, value: this.digitalCenterId}])
      .subscribe(({list}) => {
        this.list = list;
        this.loading = false;
      });
    }
  }
  createPageLink(): string {
    return `/super-admin/shipping-charge-add`;
  }
  detailPageLink(id: string) {
    return `/super-admin/shipping-charge-edit/${id}`;
  }

  get params() {
    return {
      digitalCenterId: this.digitalCenterId
    };
  }

  delete(id: string) {
    this.alertService.delete().then(
        ({value}) => {
            if (value) {
                this.alertService.saving('Deleting...');
                return this.dataService.delete(id).toPromise();
            } else {
                return false;
            }
        }
    ).then(deleted => {
      if (deleted) {
        this.list = this.list.filter(item => item.id !== id);
        this.alertService.done('Done..');
        }
    });
}
  constructor(
    private dataService: ShippingChargeService,
    private alertService: SweetAlertService
  ) {}

}
