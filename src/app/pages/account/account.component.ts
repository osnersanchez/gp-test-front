import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '../sign-in/user.service';
import { LoginManagerService } from '../../shared/subjects/login-manager.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen:boolean = true;
  public links = [
    // { name: 'Mis pedidos', href: 'dashboard', icon: 'add_shopping_cart' },
    // { name: 'Mis publicaciones', href: '', icon: 'library_books' },
    // { name: 'Vender', href: 'addresses', icon: 'monetization_on' },
    // { name: 'Mi tienda', href: 'orders', icon: 'store' },
    { name: 'Mi cuenta ', href: 'information', icon: 'account_circle' },
  ];
  constructor(public router:Router,
    public auth: UserService,
    public loginManagerService: LoginManagerService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    if(window.innerWidth < 960){
      this.sidenavOpen = false;
    };
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { 
        if(window.innerWidth < 960){
          this.sidenav.close(); 
        }
      }                
    });
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
