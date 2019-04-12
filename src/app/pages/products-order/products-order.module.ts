import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsOrderRoutes } from './products-order.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderListComponent } from './order-list/order-list.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,   
    RouterModule.forChild(ProductsOrderRoutes),
    SwiperModule,
    NgxPaginationModule,
    SharedModule,
    PipesModule
  ],
  declarations: [OrderListComponent]
})
export class ProductsOrderModule { }
