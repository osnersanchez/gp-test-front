import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartManagerService {
  private numberOfItems = new BehaviorSubject('');
  numberOfItemsField = this.numberOfItems.asObservable();

  constructor() {}

  setNumberOfItem(value: any) {
    this.numberOfItems.next(value);
  }
}
