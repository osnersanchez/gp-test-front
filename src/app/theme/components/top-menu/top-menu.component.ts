import { Component, OnInit } from '@angular/core';
import { Data, AppService } from '../../../app.service';
import { UserService } from '../../../pages/sign-in/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../../shared/auth/token-storage.service';
import { LoginManagerService } from '../../../shared/subjects/login-manager.service';
import { MatSnackBar } from '@angular/material';
import { UserFieldsManagerService } from '../../../shared/subjects/user-fields-manager.service';
import { ShoppingCartManagerService } from '../../../shared/subjects/shopping-cart.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements OnInit {
  public currencies = ['USD', 'EUR'];
  public currency: any;
  public flags = [
    { name: 'English', image: 'assets/images/flags/gb.svg' },
    { name: 'German', image: 'assets/images/flags/de.svg' },
    { name: 'French', image: 'assets/images/flags/fr.svg' },
    { name: 'Russian', image: 'assets/images/flags/ru.svg' },
    { name: 'Turkish', image: 'assets/images/flags/tr.svg' }
  ];
  public flag: any;
  public subscription: Subscription;
  public isLogged: boolean;
  public userFullName: string;
  public email: string;
  public token;
  public itemsNumber;

  constructor(
    public appService: AppService,
    public auth: UserService,
    public router: Router,
    public loginManagerService: LoginManagerService,
    public snackBar: MatSnackBar,
    public tokenStorageService: TokenStorageService,
    public userFieldsManagerService: UserFieldsManagerService,
    public shoppingCartManagerService: ShoppingCartManagerService
  ) {}

  ngOnInit() {
    this.loginManagerService.loggedInStatus.subscribe(
      (response: boolean) => {
        this.isLogged = response;
      },
      (error: any) => {
        console.log(error);
      }
    );

    this.userFieldsManagerService.fullnameField.subscribe(
      (response: string) => {
        this.userFullName = response;
      },
      (error: string) => {
        console.log(error);
      }
    );

    // this.shoppingCartManagerService.numberOfItemsField.subscribe(
    //   (response: any) => {
    //     console.log(response);
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );

    const token = this.tokenStorageService.getStorageValue();
    if (token) {
      this.email = token.emailAddress;
    }
  }

  signOut() {
    this.auth.logout();
    this.loginManagerService.setStatusLoggedIn(false);
    this.router.navigate(['/']);
    this.snackBar.open('Sesión cerrada exitosamente!', null, {
      duration: 2000
    });
  }

  signIn() {
    this.router.navigate(['/sign-in']);
  }
  // public changeCurrency(currency){
  //   this.currency = currency;
  // }

  // public changeLang(flag){
  //   this.flag = flag;
  // }
}
