import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Input() store: string;
  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit() {
  }

  get url() {
    const parts = ['/shop'];
    if (this.product) {
      parts.push(this.product.slug);
    }
    return parts.join('/');
  }

  get params() {
    if (this.store) {
      return {store: this.store};
    }
    return null;
  }

  addToCart() {
    this.storeService.addToCart(this.product, 1);
  }

}
