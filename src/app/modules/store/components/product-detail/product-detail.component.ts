import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComponentInput } from '../../interfaces/component-input.interface';
import { ProductManagerService } from '../../services/product-manager.service';
import { SlugManagerService } from '../../services/slug-manager.service';
import { AttachmentManagerService } from '../../services/attachment-manager.service';
import { Product } from '../../models/product.model';
import { Attachment } from '../../models/attachment.model';
import { ProductRatting } from '../../models/product-ratting.model';
import { RattingManagerService } from '../../services/ratting-manager.service';
import { filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnChanges {

  @Input() store: string;
  @Input() product: string;
  inputObserver: BehaviorSubject<ComponentInput> = new BehaviorSubject(null);
  productDetails: Product;
  productImage: Attachment;
  productRattings: ProductRatting[] = [];
  loading = true;
  pageObserver: BehaviorSubject<number> = new BehaviorSubject(1);
  lastPage = 1;
  cartItemCount = 0;
  constructor(
    public productManager: ProductManagerService,
    public slugManager: SlugManagerService,
    public attachmentManager: AttachmentManagerService,
    public rattingManager: RattingManagerService
  ) { }

  ngOnInit() {
    this.inputObserver.next({
      store: this.store,
      product: this.product
    });
    this.inputObserver.pipe(
      filter(() => !!this.product),
      tap(() => this.loading = true),
      switchMap(() => this.productManager.resolve(this.product))
    ).subscribe(product => {
      this.productDetails = product;
      this.loading = false;
      this.attachmentManager.resolve(product.product_image).subscribe(img => this.productImage = img);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.product) {
      this.inputObserver.next({
        product: changes.product.currentValue
      });
    }
  }

  increase() {
    this.cartItemCount++;
  }
  decrease() {
    if (this.cartItemCount > 0) {
      this.cartItemCount--;
    }
  }

}
