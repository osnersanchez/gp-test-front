import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  AfterViewInit
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Settings, AppSettings } from './app.settings';
import { LoginManagerService } from './shared/subjects/login-manager.service';
import { TokenStorageService } from './shared/auth/token-storage.service';
import { UserFieldsManagerService } from './shared/subjects/user-fields-manager.service';
import { ShoppingCartService } from './shared/services/shopping-cart.service';
import { ShoppingCartManagerService } from './shared/subjects/shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  loading = false;
  public settings: Settings;
  constructor(
    public appSettings: AppSettings,
    public router: Router,
    public loginManagerService: LoginManagerService,
    public tokenStorageService: TokenStorageService,
    public userFieldsManagerService: UserFieldsManagerService,
    public shoppingCartService: ShoppingCartService,
    public shoppingCartManagerService: ShoppingCartManagerService
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    // this.router.navigate(['']);  //redirect other pages to homepage on browser refresh
    this.loginManagerService.setStatusLoggedIn(
      this.tokenStorageService.isAuthenticated()
    );
    const token = this.tokenStorageService.getStorageValue();

    if (token) {
      const userFullName = token.firstName + ' ' + token.lastName;
      this.userFieldsManagerService.setFullName(userFullName);
    }
    this.getShoppingCartList();
  }

  getShoppingCartList() {
    const userId = this.tokenStorageService.getUserId();
    this.shoppingCartService.getByUser('en_proceso').subscribe(
      (item: any) => {
        const items = item;
        console.log(items);
        this.shoppingCartManagerService.setNumberOfItem(items);
      },
      error => console.log(error)
    );
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}
