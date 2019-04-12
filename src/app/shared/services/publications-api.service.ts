import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PublicationsApiService {

  constructor(private api: ApiService) { }

  getPublicationsList(userid) { //obtiene la lista de publicaciones
    return this.api.get(`products-list`);
  }

  getPublicationDetails(id) { //obtiene la los detalles de una publicacion
    return this.api.get(`products/${id}`);
  }

  getPublicationsCategory(id) { //obtiene la los detalles de una publicacion
    return this.api.get(`products/category/${id}`);
  }

  getPublicationsKey(key) { //obtiene la los detalles de una publicacion
    return this.api.get(`products/search/${key}`);
  }

  getCategories() {
    return this.api.get("categories/build-categories");
  }

  postPublication(body) {
    return this.api.post('products/create', body)
  }

  uploadAttached(idPublication, body) {
    return this.api.post(`products/${idPublication}/Upload`, body)
  }

  addAttached(body) {
    return this.api.post(`products/AddAttachment`, body)
  }

  deleteAttached(id) {
    return this.api.delete(`/products/DeleteAttachment/${id}`);
  }

  getPlans() {
    return this.api.get("plans");
  }

  getUnitsList() {
    return this.api.get("salesunits");
  }

  updatePublication(idPublication, body) {

    return this.api.put(`/products/${idPublication}`, body)
  }

  addCategory(body) {
    return this.api.post('categories', body);
  }

  getCategory() {
    return this.api.get('categories');
  }

  getProduct(id) {
    return this.api.get('products/'+id);
  }
  
  addProduct(body) {
    return this.api.post('products', body)
  }

  editProduct(body, id) {
    return this.api.post('products/'+id, body)
  }
  //cambios en la Api
}
