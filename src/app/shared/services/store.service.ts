import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Store } from '../models/store';
import { Image } from '../models/image';

enum hasStore {
  Sucess,
  StandBy,
  Error
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  hasStore: hasStore = 1;

  constructor(public apiService: ApiService) {}

  get(params?: any) {
    return this.apiService.get('stores/get-stores', params);
  }

  post(store: Store) {
    return this.apiService.post('stores', store);
  }

  getById(id: string) {
    return this.apiService.get(`stores/by-id/${id}`);
  }

  getByUserId(id: string) {
    return this.apiService.get(`stores/by-user/${id}`);
  }

  put(id: number, store: any) {
    return this.apiService.put(`stores/${id}`, store);
  }

  addAttachments(attachment: Image) {
    return this.apiService.post(`stores/AddAttachment`, attachment);
  }

  deleteAttachments(multimediaId: number) {
    return this.apiService.delete(`stores/DeleteAttachment/${multimediaId}`);
  }
}
