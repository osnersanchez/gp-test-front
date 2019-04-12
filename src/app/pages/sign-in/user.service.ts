import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ApiService } from '../../shared/services/api.service';
import { TokenStorageService } from '../../shared/auth/token-storage.service';
import { Environments } from '../../../environments/environments.constanst';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {  MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _user: any;
  lastProductSelected: { ProductId: string; Quantity: number } = {
    ProductId: '',
    Quantity: 0
  };
  isAuction = false;

  private _isLogin: Subject<any> = new Subject();  

  constructor(
    public apiService: ApiService ,
    public httpClient: HttpClient,
    public router: Router,
    public tokenStorageService: TokenStorageService,
    public snackBar: MatSnackBar
  ) {}

  verifyEmail(token) {
    return this.apiService.get('Users/check-email',
    null,
     {
      headers: new HttpHeaders().set('token', token),
     }
    );
  }

  resendVerificationEmail(token) {
    return this.apiService.get('Users/Resend-TokenEmail',
    null,
     {
      headers: new HttpHeaders().set('token', token),
     }
    );
  }

  sendResetPasswordMail(body) {
    return this.apiService.post('Users/Send-TokenRecovery', body);
  }

  resetPassword(token, body) {
    return this.apiService.post('Users/Recovery-Password',
     body,
     {
      headers: new HttpHeaders().set('token', token),
     }
    );
  }
  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  public login(body) {
    return this.httpClient.post(Environments.API_ENDPOINT + `/login`,body)/* .subscribe((data: any) => {
          localStorage.setItem('session', JSON.stringify(data));
          this.router.navigate(['/']);         

          this.snackBar.open('You registered successfully!', '×', {
            panelClass: 'success',
            verticalPosition: 'top',
            duration: 3000
          });

          this._isLogin.next(true);
        },
        (error: any) => {
          console.log(error);

          this.snackBar.open('You registered error!', '×', {
            panelClass: 'success',
            verticalPosition: 'top',
            duration: 3000
          });

        }); */
  }

  getMe(){
    return this.httpClient.get(Environments.API_ENDPOINT + `/user`)
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo) {
    return this.apiService.post('register', accountInfo);
  }

  /**
   * Log the user out, which forgets the session
   */
  public logout() {
    this.tokenStorageService.deleteToken();

}

  setLastProductSelectedToBuy(productId, quantity) {
    this.lastProductSelected = {
      ProductId: productId,
      Quantity: quantity
    };
  }

  getLastProductSelectedToBuy() {
    return this.lastProductSelected.ProductId;
  }

  removeLastProductSelectedToBuy() {
    this.lastProductSelected = {
      ProductId: '',
      Quantity: 0
    };
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }

  getUser(id) {
    return this.apiService.get('Users/GetUserById/' + id);
  }

  updateUser(accountInfo) {
    return this.apiService.put('Users', accountInfo);
  }
  postOpenpay(payment) {
    return this.apiService.post('openpay/addcharges', payment);
  }
}
