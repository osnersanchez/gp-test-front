import { Component, OnInit, Input} from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginManagerService } from '../../../shared/subjects/login-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input()
  categories;
  isLoggedIn = false;

  public subscription: Subscription;

  constructor(public loginManagerService: LoginManagerService,
    public router: Router,
   ) { }

  ngOnInit() { 
    this.loginManagerService.loggedInStatus.subscribe(
      (response: boolean) => {
        this.isLoggedIn = response;
      },
      (error: any ) => {
        console.log(error);
      }
    );
    
  }

  openMegaMenu() {
    let pane = document.getElementsByClassName('cdk-overlay-pane');
    [].forEach.call(pane, function(el) {
      if (el.children.length > 0) {
        if (el.children[0].classList.contains('mega-menu')) {
          el.classList.add('mega-menu-pane');
        }
      }
    });
  }

  goToCategory(categoryId) {
    this.router.navigate(['/products', { categoryId: categoryId  }]);
  }


}
