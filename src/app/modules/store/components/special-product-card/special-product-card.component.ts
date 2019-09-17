import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[app-special-product-card]',
  templateUrl: './special-product-card.component.html',
  styleUrls: ['./special-product-card.component.scss']
})
export class SpecialProductCardComponent implements OnInit {
  @Input() product: Product;
  @Input() store: string;
  constructor() { }

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

}
