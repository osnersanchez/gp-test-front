import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddShopComponent } from './add-shop/add-shop.component';
import { ListShopComponent } from './list-shop/list-shop.component';
import { UpdateShopComponent } from './update-shop/update-shop.component';

const routes: Routes = [
  { path: '', component: ListShopComponent, pathMatch: 'full' },
  { path: 'shop-assistance', component: AddShopComponent, data: { breadcrumb: 'Asistente de tienda' }},
  { path: 'update/:Id', component: UpdateShopComponent, data: { breadcrumb: 'Modificar una tienda' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyShopRoutingModule { }
