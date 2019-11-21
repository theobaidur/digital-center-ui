import { Component, OnInit, Input } from '@angular/core';
import { DeliveryArea } from '../../../admin/models/delivery-area.model';
import { DeliveryAreaService } from '../../../admin/services/delivery-area.service';
import { SweetAlertService } from '../../../admin/services/sweet-alert.service';

@Component({
  selector: 'app-delivery-area-list',
  templateUrl: './delivery-area-list.component.html',
  styleUrls: ['./delivery-area-list.component.scss']
})
export class DeliveryAreaListComponent implements OnInit {
  @Input() digitalCenterId: string;
  list: DeliveryArea[] = [];
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
    return `/super-admin/delivery-area-add`;
  }
  detailPageLink(id: string) {
    return `/super-admin/delivery-area-edit/${id}`;
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
    private dataService: DeliveryAreaService,
    private alertService: SweetAlertService
  ) {}

}
