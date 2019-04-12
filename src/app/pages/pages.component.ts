import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Settings, AppSettings } from '../app.settings';
import { AppService } from '../app.service';
import { SidenavMenuService } from '../theme/components/sidenav-menu/sidenav-menu.service';
import { CategoryService } from '../shared/services/category.service';
import { Categories } from '../shared/models/categories';
import { ShoppingCartManagerService } from '../shared/subjects/shopping-cart.service';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { TokenStorageService } from '../shared/auth/token-storage.service';
import { FormControl } from '@angular/forms';
import { HomeService } from '../shared/services/home.service';
import { ProductsSearch } from '../shared/models/products-search';
import { MatAutocompleteTrigger, MatSnackBar } from '@angular/material';
import { LoginManagerService } from '../shared/subjects/login-manager.service';
import { UserService } from './sign-in/user.service';
import { PublicationsApiService } from '../shared/services/publications-api.service';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  providers: [SidenavMenuService, CategoryService]
})
export class PagesComponent implements OnInit, AfterViewInit {
  public showBackToTop: boolean = false;
  public categories: any[] = [];
  public sidenavMenuItems: Array<any>;
  @ViewChild('sidenav')
  @ViewChild('trigger2') autocomplete2: MatAutocompleteTrigger;
  @ViewChild('trigger') autocomplete: MatAutocompleteTrigger;
  sidenav: any;
  items = [];
  isLoggedIn = false;
  searchKeysValue = '';

  searchList: ProductsSearch[] ;

  public settings: Settings;


  showBreadcrumb: boolean = true;

  constructor(
    public appSettings: AppSettings,
    public appService: AppService,
    private categoryService: CategoryService,
    public sidenavMenuService: SidenavMenuService,
    public router: Router,
    public shoppingCartManagerService: ShoppingCartManagerService,
    public shoppingCartService: ShoppingCartService,
    public tokenStorageService: TokenStorageService,
    public homeService: HomeService,
    public loginManagerService: LoginManagerService,
    private publicationsApi: PublicationsApiService,
    public auth: UserService,
    public snackBar: MatSnackBar,


  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.getCategories();
    this.sidenavMenuItems = this.sidenavMenuService.getSidenavMenuItems();
    this.shoppingCartManagerService.numberOfItemsField.subscribe(
      (response: any) => {
        console.log(response);
        
        this.items = response.data;
      }
    );
    this.publicationsApi.getCategory()
      .subscribe((res: any) => {
        console.log(res.data);
        
        this.categories = res.data
      })

    this.loginManagerService.loggedInStatus.subscribe(
      (response: boolean) => {
        this.isLoggedIn = response;
      },
      (error: any ) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(){
  }

  validateLogin(){
    let url : string = this.router.url;
    console.log("ruta events", url);
    this.showBreadcrumb = !url.includes('/products;store');
  }

  getCategories() {
    this.categoryService.get().subscribe((categories: any) => {
      this.categories = categories;
    });
  }


  public remove(product) {
    const userId = this.tokenStorageService.getUserId();
    this.shoppingCartService.delete(product.Id).subscribe(() => {
      this.shoppingCartService
        .getByUser('en_proceso')
        .subscribe((items: any) => {
          console.log(items);
          this.items = items
        });
    });
  }

  public clear() {
    this.appService.Data.cartList.length = 0;
  }

  public changeTheme(theme) {
    this.settings.theme = theme;
  }

  public stopClickPropagate(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

  public search(event?) {
    // event.preventDefault();
    if(!this.searchKeysValue.length )
      return;
    this.autocomplete.closePanel();
    this.autocomplete2.closePanel();
    this.router.navigate(['/publications'], { queryParams: { search: this.searchKeysValue  }});
    console.log('entro search');
    console.log(this.searchKeysValue);
  }

  public scrollToTop() {
    var scrollDuration = 200;
    var scrollStep = -window.pageYOffset / (scrollDuration / 20);
    var scrollInterval = setInterval(() => {
      if (window.pageYOffset != 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 10);
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      });
    }
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    $event.target.documentElement.scrollTop > 300
      ? (this.showBackToTop = true)
      : (this.showBackToTop = false);
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.sidenav && this.sidenav.close();
      }
    });
    this.sidenavMenuService.expandActiveSubMenu(
      this.sidenavMenuService.getSidenavMenuItems()
    );
  }

  public closeSubMenus() {
    if (window.innerWidth < 960) {
      this.sidenavMenuService.closeAllSubMenus();
    }
  }

  onKey(event: any) {
    const charCode = event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode === 8) {
      this.homeService.getSearchAutocomplete(event.target.value).subscribe(
        (response: any) => {
          console.log(response);
          this.searchList = response;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  onClickSearchDetail(product) {
    console.log(product);
    this.router.navigate(['/publications/publication/' + product.Id]);
  }

  goToCategory(categoryId) {
    this.router.navigate(['/products', { categoryId: categoryId  }]);
  }

  signOut() {
    this.auth.logout();
    this.loginManagerService.setStatusLoggedIn(false);
    this.router.navigate(['/']);
    this.snackBar.open('Sesión cerrada exitosamente!', null, {
      duration: 2000
    });
  }
}
