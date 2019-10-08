import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/modules/admin/models/order.model';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/modules/admin/services/order.service';
import { SweetAlertService } from 'src/app/modules/admin/services/sweet-alert.service';
import { filter, map, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LocationService } from 'src/app/modules/admin/services/location.service';
import { Address } from 'src/app/modules/admin/models/address.model';
import { AddressService } from 'src/app/modules/admin/services/address.service';
import { HttpResponseItem } from 'src/app/interfaces/http-response-item.interface';
import { AuthService } from 'src/app/modules/admin/services/auth.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order: Order = {};
  model: Address = {};
  constructor(
    private dataService: OrderService,
    private aleartService: SweetAlertService,
    private route: ActivatedRoute,
    private locationService: LocationService,
    private addressService: AddressService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      filter(params => params.id),
      map(params => params.id),
      distinctUntilChanged(),
      tap(() => this.aleartService.loading()),
      switchMap(id => this.dataService.get(id)),
      switchMap(data => {
        this.order = data;
        console.log(data);
        return this.addressService.get(this.order.shipping_address_id);
      }),
      tap(() => this.aleartService.close()),
    ).subscribe(data => {
      this.model = data;
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
      default: return 'badge-dark';
    }
  }

  get ownerEarning() {
    if (this.order.totalPrice) {
      return this.order.totalPrice - this.order.affiliateEarning - this.order.cnsEarning;
    }
    return 0;
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

  get canEdit() {
    return this.authService.authState.pipe(
      map(user => user && user.digital_center && user.digital_center_id === this.order.digital_center_id)
    );
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

  saveAddress() {
    const data: HttpResponseItem<Address> = {
      type: 'addresses',
      id: this.model.id,
      attributes: {
        detailed_address: this.model.detailed_address
      },
      relationships: {
        division: {
          data: {
            type: 'divisions',
            id: this.model.division_id
          }
        },
        district: {
          data: {
            type: 'districts',
            id: this.model.district_id
          }
        }
      }
    };
    if (this.model.upazila_id) {
      data.relationships.upazila = {
        data: {
          type: 'upazilas',
          id: this.model.upazila_id
        }
      };
    }
    if (this.model.union_id) {
      data.relationships.union = {
        data: {
          type: 'unions',
          id: this.model.union_id
        }
      };
    }
    return this.addressService.update(this.model.id, {data});
  }

  setStatus(status: 'confirmed' | 'paid' | 'complete' | 'shipped') {
    const data = {
      type: 'orders',
      id: this.order.id,
      attributes: {
        status
      }
    };
    this.aleartService.saving();
    (status === 'confirmed' ? this.saveAddress() : of(null)).pipe(
      switchMap(() => this.dataService.update(this.order.id, {data})),
      tap(() => this.aleartService.done('Saved..'))
    ).subscribe(order => this.order = order);
  }

}
