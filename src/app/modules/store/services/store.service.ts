import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SearchInfo } from '../interfaces/search-info.interface';
import { CartItem } from '../interfaces/cart-item.interface';
import { Product } from '../models/product.model';
import { StoreUiService } from './store-ui.service';

@Injectable({
    providedIn: 'root'
})

export class StoreService {
    public searchKeyUp: Subject<SearchInfo> = new Subject();
    public cartItems: CartItem[] = [];
    public cartItemRemoved: Subject<string> = new Subject();
    public currentCartDigitalCenter: string;
    constructor(
        public router: Router,
        public route: ActivatedRoute,
        private uiService: StoreUiService
    ) {
        this.searchKeyUp.subscribe(data => {
            if (!(data && data.query)) {
                this.router.navigate([], {relativeTo: this.route});
            } else {
                this.router.navigate([], {
                    queryParams: {
                        search: data.query,
                        origin: data.origin || 'URL'
                    }
                });
            }
        });
        this.cartItemRemoved.subscribe(() => {
            if (this.cartItems && this.cartItems.length === 0) {
                this.currentCartDigitalCenter = null;
            }
        });
    }

    resetSearch() {
        this.router.navigate([], {relativeTo: this.route});
    }

    clearCart() {
        const ids = this.cartItems.map(cartItem => cartItem.id);
        this.cartItems = [];
        ids.forEach(id => {
            this.cartItemRemoved.next(id);
        });
    }

    verifyCartInsert(item: CartItem) {
        return new Promise<boolean>((resolve, reject) => {
            if (!this.currentCartDigitalCenter || this.currentCartDigitalCenter === item.digital_center_id) {
                resolve(true);
            } else {
                this.uiService.confirm(
                    'Ops!',
                    `You can't buy products from two different shops at the same time<br/>
                    If you confirm this, all existing cart itmes will be removed`).then(result => {
                        if (result.value) {
                            this.clearCart();
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    });
            }

        });
    }

    addToCart(product: Product, quantity: number = 1) {
        const newItem: CartItem = {...product, quantity};
        return this.verifyCartInsert(newItem)
            .then(insert => {
                if (insert) {
                    this.currentCartDigitalCenter = newItem.digital_center_id;
                    const index = this.cartItems.findIndex(item => item.id === newItem.id);
                    if (index > -1) {
                        this.cartItems[index].quantity += quantity;
                    } else {
                        this.cartItems.push(newItem);
                    }
                    if (!this.uiService.isSmallScreen()) {
                        this.uiService.cartShown.next(true);
                    }
                    return this.cartItems.find(x => x.id === product.id);
                }
                return null;
            });
    }

    removeFromCart(productId: string) {
        const index = this.cartItems.findIndex(item => item.id === productId);
        if (index > -1) {
            this.cartItems.splice(index, 1);
            this.cartItemRemoved.next(productId);
        }
    }

    getCartItem(productId: string) {
        return this.cartItems.find(item => item.id === productId);
    }
}
