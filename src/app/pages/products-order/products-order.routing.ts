import { Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';

export const ProductsOrderRoutes: Routes = [
    { path: '', component: OrderListComponent, pathMatch: 'full' },
    // { path: 'list', component: OrderListComponent },   
];

