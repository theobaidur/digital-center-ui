import { Component, OnInit, OnDestroy } from '@angular/core';
import { EcommerceAdminService } from '../../services/ecommerce-admin.service';

import * as moment from 'moment';

@Component({
  selector: 'app-ecommerce-admin-home',
  templateUrl: './ecommerce-admin-home.component.html',
  styleUrls: ['./ecommerce-admin-home.component.scss']
})
export class EcommerceAdminHomeComponent implements OnInit, OnDestroy {
  selectedStat: any;
  refreshing = true;
  selected = {
    endDate: moment().endOf('month'),
    startDate: moment().startOf('year')
  };
  alwaysShowCalendars: boolean;
  ranges: any = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  };
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];

  isInvalidDate = (m: moment.Moment) =>  {
    return this.invalidDates.some(d => d.isSame(m, 'day') );
  }

  refresh() {
    this.refreshing = true;
    const from = this.selected ? this.selected.startDate.startOf('day').format() : moment().startOf('day').format();
    const to = this.selected ? this.selected.endDate.endOf('day').format() : moment().endOf('day').format();
    this.adminService.fetchStat(from, to).subscribe(stat => {
      this.refreshing = false;
      this.selectedStat = stat;
    });
  }

  constructor(
    private adminService: EcommerceAdminService
  ) {
    this.alwaysShowCalendars = true;
  }

  ngOnInit() {}

  get stat() {
    return this.adminService.adminStat;
  }

  ngOnDestroy() {}

  rangeSelected() {
    this.refresh();
  }

  get due() {
    try {
      return ((+this.selectedStat.due_count) - (+this.selectedStat.payment_paid_count)).toFixed(2);
    } catch (e) {}
    return 0;
  }

  total(stat: any){
    let total = 0;
    if(stat){
      Object.keys(stat).forEach(key=>{
        total += stat[key];
      });
    }
    return total;
  }

  details(stat: any){
    return Object.keys(stat || {}).map(key => `${key}: ${stat[key]}`).join(', ');
  }

}
