import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxImageZoomModule } from 'ngx-image-zoom';

import { StoreRoutingModule } from './store-routing.module';
import { StoreBaseComponent } from './pages/store-base/store-base.component';
import { HeaderComponent } from './components/header/header.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { OtherStoresComponent } from './components/other-stores/other-stores.component';
import { StoreFooterComponent } from './components/store-footer/store-footer.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ChooseSubCategoryComponent } from './components/choose-sub-category/choose-sub-category.component';
import { SpecialProductsComponent } from './components/special-products/special-products.component';
import { SpecialProductCardComponent } from './components/special-product-card/special-product-card.component';
import { StoreBannerComponent } from './components/store-banner/store-banner.component';
import { RootCategoryCardComponent } from './components/root-category-card/root-category-card.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { StoreHomeComponent } from './components/store-home/store-home.component';
import { CategoryProductListComponent } from './components/category-product-list/category-product-list.component';
import { ProductOrSubCategoryComponent } from './components/product-or-sub-category/product-or-sub-category.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { StorePromotionComponent } from './components/store-promotion/store-promotion.component';
import { StoreGalleryComponent } from './components/store-gallery/store-gallery.component';
import { StoreCardComponent } from './components/store-card/store-card.component';
import { HttpClientModule } from '@angular/common/http';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { OtherStoreListComponent } from './components/other-store-list/other-store-list.component';
import { CategoryBannerComponent } from './components/category-banner/category-banner.component';
import { OffersComponent } from './components/offers/offers.component';
import { PopularItemsComponent } from './components/popular-items/popular-items.component';
import { StoresComponent } from './components/stores/stores.component';
import { StarRattingComponent } from './components/star-ratting/star-ratting.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { PipeModule } from 'src/app/pipes/pipe.module';
import { TokenResolverService } from 'src/app/services/token-resolver.service';
import { tokenList } from 'src/app/locale/shop-lang-token';
import { DirectiveModule } from 'src/app/directives/directive.module';
import { ShippingChargeComponent } from './components/shipping-charge/shipping-charge.component';
import { DeliveryAreaComponent } from './components/delivery-area/delivery-area.component';
import { TrackVerifyOrderComponent } from './components/track-verify-order/track-verify-order.component';
import { TermsConditionComponent } from './components/terms-condition/terms-condition.component';


@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [StoreBaseComponent, HeaderComponent, LeftSidebarComponent, OtherStoresComponent, StoreFooterComponent, ProductDetailComponent, ProductCardComponent, CategoryListComponent, ChooseSubCategoryComponent, SpecialProductsComponent, SpecialProductCardComponent, StoreBannerComponent, RootCategoryCardComponent, NotFoundComponent, StoreHomeComponent, CategoryProductListComponent, ProductOrSubCategoryComponent, ProductListComponent, StorePromotionComponent, StoreGalleryComponent, StoreCardComponent, ImageViewerComponent, OtherStoreListComponent, CategoryBannerComponent, OffersComponent, PopularItemsComponent, StoresComponent, StarRattingComponent, SearchResultComponent, ShoppingCartComponent, ShippingChargeComponent, DeliveryAreaComponent, TrackVerifyOrderComponent, TermsConditionComponent],
  imports: [
    CommonModule,
    FormsModule,
    StoreRoutingModule,
    HttpClientModule,
    NgxImageZoomModule.forRoot(),
    PipeModule,
    DirectiveModule
  ]
})
export class StoreModule {
  constructor(tokenResolver: TokenResolverService) {
    tokenResolver.register(tokenList);
  }
}
