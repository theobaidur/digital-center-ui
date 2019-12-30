import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/modules/admin/models/order.model';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/modules/admin/services/order.service';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';
import { filter, map, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/admin/services/auth.service';
import { Roles } from 'src/app/enums/roles.enum';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order: Order = {};
  constructor(
    private dataService: OrderService,
    private aleartService: SweetAlertService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      filter(params => params.id),
      map(params => params.id),
      distinctUntilChanged(),
      tap(() => this.aleartService.loading()),
      switchMap(id => this.dataService.get(id, true)),
      tap(() => this.aleartService.close()),
    ).subscribe(data => {
      this.order = data;
    });
  }

  badgeClass(status: string) {
    switch (status) {
      case 'pending': return 'badge-primary';
      case 'complete': return 'badge-success';
      case 'confirmed': return 'badge-info';
      case 'paid': return 'badge-warning';
      case 'shipped': return 'badge-light';
      case 'verified': return 'badge-danger';
      case 'cancelled': return 'badge-danger';
      default: return 'badge-dark';
    }
  }

  get salesCommission() {
    try {
      if(this.order.seller_id === this.order.digital_center_id){
        return this.order.cns_charge;
      } else {
        return this.order.cns_charge +  this.order.affiliate_charge;
      }
    } catch (e) {}
    return 0;
  }

  get sellerEarning(){
    try {
      return this.order.totalPrice - this.salesCommission + this.order.delivery_charge;
    } catch (e) {}
    return 0; 
  }

  get affiliateCommission() {
    try {
      if(this.order.seller_id === this.order.digital_center_id){
        return 0;
      } else {
        return this.order.affiliate_charge;
      }
    } catch (e) {}
    return 0;
  }

  get cnsEarning() {
    return this.salesCommission - this.affiliateCommission;
  }

  get owner() {
    return this.authService.isAdminOf(this.order.digital_center_id);
  }

  get cns() {
    return this.authService.hasRole(Roles.SUPER_ADMIN);
  }

  get affiliate() {
    return this.authService.isAdminOf(this.order.seller_id);
  }

  get hasAffiliate() {
    return this.order.seller_id !== this.order.digital_center_id;
  }

  get total() {
    if (this.order && this.order.items && this.order.items.length) {
      try {
        return this.order.items.reduce((total, curr) => total + ((+curr.unit_price) * (+curr.quantity)), this.order.delivery_charge || 0);
      } catch (e) {}
    }
    return 0;
  }

  get canEdit() {
    return this.authService.authState.pipe(
      map(user => user && user.digital_center && user.digital_center_id === this.order.digital_center_id)
    );
  }

  setStatus(status: 'confirmed' | 'paid' | 'complete' | 'shipped' | 'cancelled') {
    const data = {
      type: 'orders',
      id: this.order.id,
      attributes: {
        status,
        delivery_address: this.order.delivery_address
      }
    };
    this.aleartService.saving();
    this.dataService.update(this.order.id, {data}).pipe(
      tap(() => this.aleartService.done('Saved..'))
    ).subscribe(order => this.order = order);
  }

  get cancelable(){
    return !(this.order.status === 'paid' || this.order.status === 'complete' || this.order.status === 'cancelled');
  }

}
