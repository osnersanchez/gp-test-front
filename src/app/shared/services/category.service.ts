import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(public apiService: ApiService) {}

  get(params?: any) {
    return this.apiService.get('categories/build-categories', params);
  }

  post(body) {
    this.apiService.post('categories/build-categories', body);
  }

  put(body) {
    this.apiService.put('categories/build-categories', body);
  }

  delete(id) {
    this.apiService.delete('categories/build-categories/' + id);
  }

  getCategoriesTreeList(params?: any) {
    return this.apiService.get('categories/ListCategories', params);
  }
}
