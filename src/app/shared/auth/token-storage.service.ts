import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  public getToken(): string {
    const token = JSON.parse(localStorage.getItem('session'));
    if (token) {
      return token['token'];
    } else {
      return '';
    }
  }

  public getUserId() {
    const token = JSON.parse(localStorage.getItem('session'));
    if (token) {
      return token['id'];
    } else {
      return null;
    }
  }

  public deleteToken() {
    localStorage.removeItem('session');
  }

  public isAuthenticated(): boolean {
    const token = JSON.parse(localStorage.getItem('session'));
    if (token) {
      return true;
    } else {
      return false;
    }
    // return tokenNotExpired(null, token);
  }

  public getEmployeeId() {
    const token = JSON.parse(localStorage.getItem('session'));
    return token['employeeId'];
  }

  public getUserid() {
    let data = JSON.parse(localStorage.getItem('session'));
    return data.userId;
  }

  public getSession() {
    return JSON.parse(localStorage.getItem('session'));
  }

  public setToken(token: string) {
    localStorage.setItem('session', token);
  }
  
  public getStorageValue() {
    return JSON.parse(localStorage.getItem('session'));
  }


  public getemailAddress() {
    var token;
    if (JSON.parse(localStorage.getItem('session'))) {
      token = JSON.parse(localStorage.getItem('session'));
      return token['emailAddress'];
    }
    return "";
  }

}
