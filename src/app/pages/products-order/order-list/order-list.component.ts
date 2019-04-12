import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  loadDetails: boolean = false;
  products = [];

  constructor(
    private shoppingCartService: ShoppingCartService
  ){

  }

  ngOnInit(){
    this.getCart();
  }

  getCart() {
    this.loadDetails = true;
    this.shoppingCartService.getByUser('comprado').subscribe(
      (products: any) => {
        this.loadDetails = false;
        this.products = products.data;
      },
      error => {
        this.loadDetails = false;
        console.log(error);
      }
    );
  }

}