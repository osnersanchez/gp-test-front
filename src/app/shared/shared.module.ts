import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule,
         MatButtonModule,
         MatButtonToggleModule,
         MatCardModule,
         MatCheckboxModule,
         MatChipsModule,
         MatDatepickerModule,
         MatDialogModule,
         MatExpansionModule,
         MatGridListModule,
         MatIconModule,
         MatInputModule,
         MatListModule,
         MatMenuModule,
         MatNativeDateModule,
         MatPaginatorModule,
         MatProgressBarModule,
         MatProgressSpinnerModule,
         MatRadioModule,
         MatRippleModule,
         MatSelectModule,
         MatSidenavModule,
         MatSliderModule,
         MatSlideToggleModule,
         MatSnackBarModule,
         MatSortModule,
         MatTableModule,
         MatTabsModule,
         MatToolbarModule,
         MatTooltipModule,
         MatStepperModule } from '@angular/material';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true
};

import { PipesModule } from '../theme/pipes/pipes.module';
import { RatingComponent } from './rating/rating.component';
import { ControlsComponent } from './controls/controls.component';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { BrandsCarouselComponent } from './brands-carousel/brands-carousel.component';
import { ProductsCarouselComponent } from './products-carousel/products-carousel.component';
import { ProductDialogComponent } from './products-carousel/product-dialog/product-dialog.component';
import { BannersComponent } from './banners/banners.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { LoadingComponent } from './loading/loading.component';
import { ProductsRelatedComponent } from './products-related/products-related.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { MaskLoadingComponent } from './mask-loading/mask-loading.component';
import { MethodPaymentDialogComponent } from './method-payment-dialog/method-payment-dialog.component';
import { CheckoutModule } from '../pages/checkout/checkout.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrMasker4Module } from 'brmasker4';
import { AlertComponent } from './alert/alert.component';
import { OfferDialogComponent } from './offer-dialog/offer-dialog.component';
import { ShopsCarouselComponent } from './shops-carousel/shops-carousel.component';
import { CollectionProductsComponent } from './collection-products/collection-products.component';
import { ProductsCategoryComponent } from './products-category/products-category.component';
import { FooterCardsComponent } from './footer-cards/footer-cards.component';
import { ProductsCardComponent } from './products-card/products-card.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    PerfectScrollbarModule,
    PipesModule,
    ReactiveFormsModule,
    BrMasker4Module,
    FormsModule
    // CheckoutModule
  ],
  exports: [
    RouterModule,
    SwiperModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    PerfectScrollbarModule,
    PipesModule,
    RatingComponent,
    ControlsComponent,
    MainCarouselComponent,
    BrandsCarouselComponent,
    ProductsCarouselComponent,
    ProductsCardComponent,
    ProductDialogComponent, 
    BannersComponent,
    CategoryListComponent,
    LoadingComponent,
    ProductsRelatedComponent,
    UploadImageComponent,
    MaskLoadingComponent,
    MethodPaymentDialogComponent,
    ShopsCarouselComponent,
    CollectionProductsComponent,
    ProductsCategoryComponent,
    FooterCardsComponent,
    AlertComponent
  ],
  declarations: [
    RatingComponent,
    ControlsComponent,
    MainCarouselComponent,
    BrandsCarouselComponent,
    ProductsCarouselComponent,
    ProductsCardComponent,
    ProductDialogComponent,
    BannersComponent,
    CategoryListComponent,
    LoadingComponent,
    ProductsRelatedComponent,
    UploadImageComponent,
    MaskLoadingComponent,
    MethodPaymentDialogComponent,
    OfferDialogComponent,
    ShopsCarouselComponent,
    CollectionProductsComponent,
    ProductsCategoryComponent,
    FooterCardsComponent,      
    AlertComponent,    
    OfferDialogComponent,       
  ],
  entryComponents:[
    ProductDialogComponent,
    MethodPaymentDialogComponent,
    AlertComponent,
    OfferDialogComponent
  ],
  providers:[
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
  ]
})
export class SharedModule { }
