import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environments } from '../../../environments/environments.constanst';

@Injectable({
  providedIn: 'root'
})
export class ShopApiService {
 
  constructor(private http: HttpClient) { }

  addStore(body) { //Agregar una tienda nueva
    return this.http.post(`${Environments.API_ENDPOINT}/stores`,body);
  }

  getAllShop(id){
    return this.http.get(`${Environments.API_ENDPOINT}/stores/by-user/${id}`); 
  }
  
  getShop(id) {
     return this.http.get(`${Environments.API_ENDPOINT}/stores/by-id/${id}`); 
  }

  updateShop() {

  }

  deleteAttached(id){
    return this.http.delete(`${Environments.API_ENDPOINT}/stores/DeleteAttachment/${id}`); 
  }
}