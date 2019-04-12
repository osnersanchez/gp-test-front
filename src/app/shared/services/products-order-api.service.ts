import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environments } from '../../../environments/environments.constanst';

@Injectable({
  providedIn: 'root'
})
export class ProductsOrderApiService {
 
  constructor(private http: HttpClient) { }

  getOrders(userid) { //obtiene la lista de productos pedidos de un cliente
    return this.http.get(`${Environments.API_ENDPOINT}/orders/get-orders/${userid}`); 
  }
}
