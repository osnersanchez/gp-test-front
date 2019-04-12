import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchManagerService {

  private _searchValue: BehaviorSubject<string> = new BehaviorSubject("");
  private _loadData: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  getLoadData(){
    return this._loadData.asObservable();
  }

  getSearchValue(){
    return this._searchValue.asObservable();
  }

  setSearchValue(newValue){
      this._searchValue.next(newValue);
  }

  loadProducts(){
    this._loadData.next(true);
    /* this.productsOrderService.getOrders(id).pipe(
      first(),
    ).subscribe(res=>{      
      this._productsOrderList.next(res);
      this._loadData.next(false);
    }, 
      err=>{
        this._loadData.next(false);
        console.log("error al cargar la lista de productos");
      }
    ) */
  }
}
