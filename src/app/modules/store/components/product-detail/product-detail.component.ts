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
import { StoreService } from '../../services/store.service';
import { CartItem } from '../../interfaces/cart-item.interface';
import { SeoService } from 'src/app/services/seo.service';
import { LanguageService } from 'src/app/services/language.service';

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
  cartItem: CartItem;
  seoUpdater: BehaviorSubject<any> = new BehaviorSubject(false);
  constructor(
    public productManager: ProductManagerService,
    public slugManager: SlugManagerService,
    public attachmentManager: AttachmentManagerService,
    public rattingManager: RattingManagerService,
    public storeService: StoreService,
    private seoService: SeoService,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.inputObserver.next({
      store: this.store,
      product: this.product,
    });
    this.inputObserver.pipe(
      filter(() => !!this.product),
      tap(() => this.loading = true),
      switchMap(() => this.productManager.resolve(this.product))
    ).subscribe(product => {
      console.log(product);
      this.productDetails = product;
      this.seoUpdater.next(true);
      this.loading = false;
      this.attachmentManager.resolve(product.primary_image).subscribe(img => this.productImage = img);
      this.cartItem = this.storeService.getCartItem(product.id);
    });
    this.storeService.cartItemRemoved.subscribe(id => {
      if (this.productDetails && this.productDetails.id === id) {
        this.cartItem = null;
      }
    });
    this.languageService.language.subscribe(lng => this.seoUpdater.next(true));
    this.seoUpdater.subscribe(() => {
      const lng = this.languageService.language.getValue().toLowerCase() === 'bn' ? '_bn' : '';
      const product: Product = this.productDetails;
      if (product) {
        const title = product['name' + lng] || product.name;
        const d1 = product['related_name' + lng] || product.related_name;
        const d2 = product['short_description' + lng] || product.short_description;
        const d3 = product['description' + lng] || product.description;
        const description = [d1, d2, d3].filter(value => !!value).join(' | ');
        const url = window.location.href;
        const image = product.primary_image;
        const withPrefix = false;
        this.seoService.updateTag({title, withPrefix, description, url, image});
      }
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
    if (!this.cartItem) {
      this.storeService.addToCart(this.productDetails, 1).then(item => {
        if (item) {
          this.cartItem = item;
        }
      });
    } else {
      this.cartItem.quantity++;
    }
  }
  decrease() {
    if (this.cartItem && this.cartItem.quantity > 1) {
      this.cartItem.quantity--;
    }
  }

}
