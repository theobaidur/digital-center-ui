import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComponentInput } from '../../interfaces/component-input.interface';
import { CartItem } from '../../interfaces/cart-item.interface';
import { DigitalCenter } from 'src/app/model/digital-center.interface';
import { StoreService } from '../../services/store.service';
import { StoreUiService } from '../../services/store-ui.service';
import { DeliveryAreaManagerService } from '../../services/delivery-area-manager.service';
import { DeliveryArea } from 'src/app/modules/admin/models/delivery-area.model';
import { StoreManagerService } from '../../services/store-manager.service';
import { filter, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnChanges {
  @Input() store: string;
  inputObserver: BehaviorSubject<ComponentInput> = new BehaviorSubject(null);
  storeDetails: DigitalCenter;
  cartShown = false;
  deliveryAreas: DeliveryArea[] = [];
  selectedDeliveryArea = '';
  constructor(
    private storeService: StoreService,
    private storeManagerService: StoreManagerService,
    private uiService: StoreUiService,
    private deliveryAreaService: DeliveryAreaManagerService
  ) {
    this.inputObserver.pipe(
      filter(input => !!(input && input.store)),
      map(input => input.store),
      switchMap(slug => this.storeManagerService.resolveBySlug(slug)),
      filter(center => !!center),
      switchMap(center => this.deliveryAreaService.getPage(-1, [{
        property: `filter[digital_center_id]`,
        value: center.shop_affiliate_only ? center.affiliate_of : center.id
      }]))
    ).subscribe(({list}) => this.deliveryAreas = list);
  }

  ngOnInit() {
    this.inputObserver.next({
      store: this.store
    });
    this.uiService.cartShown.subscribe(val => this.cartShown = val);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.store) {
      this.inputObserver.next({
        store: changes.store.currentValue
      });
    }
  }

  removeFromCart(id: string) {
    this.storeService.removeFromCart(id);
  }

  get cartItems() {
    return this.storeService.cartItems;
  }

  get totalItem() {
    return this.cartItems.reduce((total, current) => total + current.quantity , 0);
  }

  get totalPrice() {
    return (this.deliveryCharge
      + this.cartItems.reduce((total, current) => total + (current.quantity * current.unit_price) , 0)).toFixed(2);
  }

  showCart() {
    this.uiService.cartShown.next(true);
  }
  hideCart() {
    this.uiService.cartShown.next(false);
  }
  toggleCart() {
    if (this.cartShown) {
      this.hideCart();
    } else {
      this.showCart();
    }
  }

  increase(item: CartItem) {
    item.quantity++;
  }
  decrease(item: CartItem) {
    item.quantity--;
  }

  checkout() {
    const areas = [...this.deliveryAreas].map(each => {
      if (each.id === this.selectedDeliveryArea) {
        each.selected = true;
      }
      return each;
    });
    this.uiService.checkout(this.cartItems, this.storeService.currentCartDigitalCenter,
      areas.filter(each => each.digital_center_id === this.storeService.currentCartDigitalCenter))
      .then(() => this.storeService.clearCart());
  }

  get deliveryCharge() {
    const area = this.deliveryAreas.find(each => each.id === this.selectedDeliveryArea);
    if (!area) {
      return 0;
    }
    return +area.delivery_charge;

  }

}
