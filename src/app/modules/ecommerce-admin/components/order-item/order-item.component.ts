import { Component, OnInit, Input } from '@angular/core';
import { OrderItem } from 'src/app/modules/admin/models/order-item.model';
import { Product } from 'src/app/modules/admin/models/product.model';
import { ProductService } from 'src/app/modules/admin/services/product.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[app-order-item]',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  @Input() item: OrderItem;
  product: Product;
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    if (this.item) {
      this.productService.get(this.item.product_id).subscribe(product => {
        this.product = product;
      });
    }
  }
}
