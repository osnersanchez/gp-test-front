import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private apiService: ApiService) { }

  
  getByUser(status: any) {
    return this.apiService.get(`shopping/search/`+status);
  }

  put(body) {
    return this.apiService.put('shopping-cart/update', body);
  }

  post(body) {
    return this.apiService.post('shopping', body);
  }

  delete(id) {
    return this.apiService.delete(`shopping/${id}`);
  }

  buildAll() {
    return this.apiService.get(`checkout`);
  }
}
