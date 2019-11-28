import { Component, OnInit, Input } from '@angular/core';
import { Advertisement } from '../../../admin/models/advertisement.model';
import { SweetAlertService } from '../../../admin/services/sweet-alert.service';
import { AdvertisementService } from '../../../admin/services/advertisement.service';

@Component({
  selector: 'app-advertisement-list',
  templateUrl: './advertisement-list.component.html',
  styleUrls: ['./advertisement-list.component.scss']
})
export class AdvertisementListComponent implements OnInit {
  @Input() digitalCenterId: string;
  list: Advertisement[] = [];
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
    return `/super-admin/advertisement-add`;
  }
  detailPageLink(id: string) {
    return `/super-admin/advertisement-edit/${id}`;
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
    private dataService: AdvertisementService,
    private alertService: SweetAlertService
  ) {}

}
