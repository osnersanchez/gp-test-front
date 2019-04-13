import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private apiService: ApiService, private http:HttpClient) {}
  get(id?: any) {
    return this.apiService.get(`landing/init/${id}`);
  }

  getInitLanding(id) {
    return this.http.get(`https://betweinc-api.azurewebsites.net/api/landing/user-landing-page/null`);

  }

  getSearch(params?: string){
    if (params && params.trim() !== '') {
      return this.apiService.get(`publications/search/${params}`);
    } else {
      return;
    }
  }

  getSearchAutocomplete(params?: string){
    if (params && params.trim() !== '') {
      return this.apiService.get(`publications/auto-complete-search/${params}`);
    } else {
      return;
    }
  }

  getSearchByParams(body){
      return this.apiService.post(`products/search-by-params/`, body );
  }
}
