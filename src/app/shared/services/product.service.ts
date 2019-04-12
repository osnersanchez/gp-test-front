import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(public apiService: ApiService) {}

  get() {
    return this.apiService.get('products/get-products');
  }

  getProduct(id) {
    return this.apiService.get(`products/${id}`);
  }

  getId(params: any) {
    return this.apiService.get(`products/get-detail/${params}`);
  }

  post(body) {
    return this.apiService.post('products/create1', body);
  }

  put(params) {
    return this.apiService.put(`products/${params.id}`, params);
  }

  delete(id) {
    this.apiService.delete('products/get-products/' + id);
  }

  getByUserId(id: string | number) {
    return this.apiService.get(`products/get-products-by-user/${id}`);
  }

  uploadAttachments(id, file) {
    console.log(file);
    return this.apiService.post(`products/${id}/Upload`, file);
  }

  createAuction(auction){
    return this.apiService.post('auctions/create', auction);
  }
}
