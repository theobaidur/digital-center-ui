import { Component, OnInit, OnDestroy } from '@angular/core';
import { SuperAdminService } from '../../services/super-admin.service';
import { interval } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-super-admin-home',
  templateUrl: './super-admin-home.component.html',
  styleUrls: ['./super-admin-home.component.scss']
})
export class SuperAdminHomeComponent implements OnInit, OnDestroy {

  constructor(
    private superAdminService: SuperAdminService
  ) {
    this.superAdminService.refreshStat.next(true);
  }

  ngOnInit() {
    interval(60 * 1000).pipe(
      untilDestroyed(this)
    ).subscribe(() => {
      this.superAdminService.refreshStat.next(true);
    });
  }

  get stat() {
    return this.superAdminService.adminStat;
  }

  ngOnDestroy() {}

}
