import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComponentInput } from '../../interfaces/component-input.interface';
import { CartItem } from '../../interfaces/cart-item.interface';
import { DigitalCenter } from 'src/app/model/digital-center.interface';
import { StoreService } from '../../services/store.service';
import { StoreUiService } from '../../services/store-ui.service';

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
  constructor(
    private storeService: StoreService,
    private uiService: StoreUiService
  ) { }

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
    return this.cartItems.reduce((total, current) => total + (current.quantity * current.unit_price) , 0).toFixed(2);
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
    this.uiService.checkout(this.cartItems, this.storeService.currentCartDigitalCenter).then(() => this.storeService.clearCart());
  }

}
