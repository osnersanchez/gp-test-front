import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { MyShopRoutingModule } from './my-shop-routing.module';
import { AddShopComponent } from './add-shop/add-shop.component';
import { ListShopComponent } from './list-shop/list-shop.component';
import { UpdateShopComponent } from './update-shop/update-shop.component';

@NgModule({
  imports: [
    CommonModule,
    MyShopRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    AddShopComponent,
    ListShopComponent,
    UpdateShopComponent
  ]
})
export class MyShopModule { }
