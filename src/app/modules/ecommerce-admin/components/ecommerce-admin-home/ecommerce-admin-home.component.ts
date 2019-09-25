import { Component, OnInit, OnDestroy } from '@angular/core';
import { EcommerceAdminService } from '../../services/ecommerce-admin.service';
import { interval } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-ecommerce-admin-home',
  templateUrl: './ecommerce-admin-home.component.html',
  styleUrls: ['./ecommerce-admin-home.component.scss']
})
export class EcommerceAdminHomeComponent implements OnInit, OnDestroy {

  constructor(
    private adminService: EcommerceAdminService
  ) {
    this.adminService.refreshStat.next(true);
  }

  ngOnInit() {
    interval(60 * 1000).pipe(
      untilDestroyed(this)
    ).subscribe(() => {
      this.adminService.refreshStat.next(true);
    });
  }

  get stat() {
    return this.adminService.adminStat;
  }

  ngOnDestroy() {}

}
