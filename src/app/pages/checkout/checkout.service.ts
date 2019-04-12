import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  constructor(private apiService: ApiService) {}

  get(id: any) {
    return this.apiService.get('orders/get-orders/' + id);
  }

  post(id: any, body) {
    return this.apiService.post('orders/CreateOrder/' + id, body);
  }
}
