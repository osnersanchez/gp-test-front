import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Data, AppService } from '../../app.service';
import { Product } from '../../app.models';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { ShoppingCartManagerService } from '../subjects/shopping-cart.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  @Input() product: any;
  @Input() type: string;
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  @Output() onQuantityChange: EventEmitter<any> = new EventEmitter<any>();

  @Output() onOpenOfferDialog: EventEmitter<any> = new EventEmitter();


  public count: number = 1;
  public align = 'center center';
  constructor(
    public appService: AppService,
    public snackBar: MatSnackBar,
    private shoppintCart: ShoppingCartService,
    private tokeStorageService: TokenStorageService,
    private shoppingCartService: ShoppingCartService,
    public shoppingCartManagerService: ShoppingCartManagerService
  ) {}

  ngOnInit() {
    this.count = this.product.Quantity;
    if (this.product) {
      // console.log(this.product);
    }
    this.layoutAlign();
  }

  public layoutAlign() {
    if (this.type == 'all') {
      this.align = 'space-between center';
    } else if (this.type == 'wish') {
      this.align = 'start center';
    } else {
      this.align = 'center center';
    }
  }

  public increment(count) {
    const userId = this.tokeStorageService.getUserId();
    this.count++;
    let obj = {
      Id: this.product.Id,
      UserId: userId,
      ProductId: this.product.ProductId,
      Quantity: this.count,
      Deleted: 'false',
      total: this.count * this.product.Quantity
    };

    this.shoppingCartService.put(obj).subscribe(
      (response: any) => {
        this.changeQuantity(response.Total);
      },
      error => console.log(error)
    );
  }

  public decrement(count) {
    const userId = this.tokeStorageService.getUserId();
    if (this.count > 1) {
      this.count--;
      let obj = {
        Id: this.product.Id,
        UserId: userId,
        ProductId: this.product.ProductId,
        Quantity: this.count,
        Deleted: 'false',
        total: this.count * this.product.Price
      };
      this.shoppingCartService.put(obj).subscribe(
        (response: any) => {
          this.changeQuantity(response.Total);
        },
        error => console.log(error)
      );
    }
  }

  public addToCompare(product: Product) {
    this.appService.addToCompare(product);
  }

  public addToWishList(product: Product) {
    this.appService.addToWishList(product);
  }

  public addToCart(product) {
    console.log("Producto agregar al carrito ",product);
    const userId = this.tokeStorageService.getUserId();
    const productCart = {
      UserId: userId,
      ProductId: product.Id,
      Quantity: 1
    };
    this.shoppintCart.post(productCart).subscribe(
      response => {
        if (response) {
          console.log(response);
          this.shoppintCart.getByUser('en_proceso').subscribe((response: any) => {
            const items = response;
            this.shoppingCartManagerService.setNumberOfItem(items);
            this.snackBar.open('Agregado al carrito!', null, {
              duration: 2000
            });
          });
        }
      },
      error => console.log(error)
    );
  }

  public openProductDialog(event) {
    this.onOpenProductDialog.emit(event);
  }

  public changeQuantity(value) {
    this.onQuantityChange.emit(value);
  }

  public ofertar(product){    
    this.onOpenOfferDialog.emit(product);
  }  
}