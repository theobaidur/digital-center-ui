import { Component, OnInit, Input } from '@angular/core';
import { Biggapon } from '../../../admin/models/biggapon.model';
import { SweetAlertService } from '../../../admin/services/sweet-alert.service';
import { BiggaponService } from '../../../admin/services/biggapon.service';

@Component({
  selector: 'app-biggapon-list',
  templateUrl: './biggapon-list.component.html',
  styleUrls: ['./biggapon-list.component.scss']
})
export class BiggaponListComponent implements OnInit {
  @Input() digitalCenterId: string;
  list: Biggapon[] = [];
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
    return `/super-admin/biggapon-add`;
  }
  detailPageLink(id: string) {
    return `/super-admin/biggapon-edit/${id}`;
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
    private dataService: BiggaponService,
    private alertService: SweetAlertService
  ) {}

}
