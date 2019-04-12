import { Injectable } from '@angular/core';
import { ProductsOrderApiService } from '../services/products-order-api.service';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductsOrderManagerService {

  private _productsOrderList: BehaviorSubject<any> = new BehaviorSubject(null);
  private _loadData: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private productsOrderService: ProductsOrderApiService) { }

  getLoadData(){
    return this._loadData.asObservable();
  }

  getProductOrderList(id){
    this.loadProductOrderList(id);
    return this._productsOrderList.asObservable();
  }

  loadProductOrderList(id){
    this._loadData.next(true);
    this.productsOrderService.getOrders(id).pipe(
      first(),
    ).subscribe(res=>{      
      this._productsOrderList.next(res);
      this._loadData.next(false);
    }, 
      err=>{
        this._loadData.next(false);
        console.log("error al cargar la lista de productos");
      }
    )
  }
}
