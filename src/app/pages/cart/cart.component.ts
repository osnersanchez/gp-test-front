import { Component, OnInit } from '@angular/core';
import { Data, AppService } from '../../app.service';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { TokenStorageService } from '../../shared/auth/token-storage.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  total = [];
  grandTotal = 0;
  products = [];
  loadDetails: boolean = false;
  totalPrice;
  constructor(
    public appService: AppService,
    public snackBar: MatSnackBar,
    private shoppingCartService: ShoppingCartService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit() {
    this.getCart();
  }

  public getTotalPrice(value) {
    console.log(value);

    this.getCart();
  }

  getCart() {
    this.loadDetails = true;
    const userId = this.tokenStorageService.getUserId();
    this.shoppingCartService.getByUser('en_proceso').subscribe(
      (products: any) => {
        this.loadDetails = false;
        this.products = products.data;
        this.grandTotal = 0;
        this.products.forEach(product => {
          this.grandTotal += product.amount;
        });
      },
      error => {
        this.loadDetails = false;
        console.log(error);
      }
    );
  }

  public remove(product) {
    console.log(product);
    this.shoppingCartService.delete(product.id).subscribe(() => {
      this.snackBar.open('Se a eliminado el producto', '×', { panelClass: 'success', verticalPosition: 'top', duration: 5000 });
      this.getCart()
    }, err => {
      this.snackBar.open('No se pudo eliminar el producto', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });

    });
  }

  public clear() {
    this.appService.Data.cartList.length = 0;
  }

  confirm() {
    this.loadDetails = true;
    this.shoppingCartService.buildAll().subscribe(() => {
      this.loadDetails = false;
      this.snackBar.open('Se ha procesado su compra', '×', { panelClass: 'success', verticalPosition: 'top', duration: 5000 });
      this.getCart();
    }, err => {
      this.loadDetails = false;
      this.snackBar.open('No se ha podido hacer la compra', '×', { panelClass: 'success', verticalPosition: 'top', duration: 5000 });
    })
  }

}
