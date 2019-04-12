import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ShopManagerService } from '../../../shared/subjects/shop-manager.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AlertComponent } from '../../../shared/alert/alert.component';

@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.scss']
})
export class AddShopComponent implements OnInit, OnDestroy {

  private subcriptions: Subscription = new Subscription();
  public loading: boolean = false;
  public shop = null;
  public attachedList = [];
  public logoList = [];
  public bannerList = [];
  public imgLogoAttached = [];
  // public imgLogo = '../../../assets/images/small_logo.jpg';
  public imgLogo = '';
  public imgBanner = '';
  public showStore: boolean = false;

  public formShop: FormGroup = this._formBuilder.group({
    Name: ['', Validators.required],
    Slogan: ['', Validators.required],
    // Owner: ['', Validators.required],
    // OwnerId: ['', Validators.required],
    // Attachments: ['', Validators.required]    
    imgLogo: [''],
    imgBanner: [''],
  });

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private managerShop: ShopManagerService,
    public snackBar: MatSnackBar,
    public confirmDialog: MatDialog
  ) { }

  ngOnInit() {
    this.subcriptions.add(this.managerShop.getLoadingShop().subscribe(load => this.loading = load))
    this.subcriptions.add(this.managerShop.getShop().subscribe(shop => {
      if (shop) {
        this.shop = shop
        this.router.navigate(['/publications']);

        this.snackBar.open('You registered successfully!', '×', {
          panelClass: 'success',
          verticalPosition: 'top',
          duration: 3000
        });
      }
    }));
  }

  ngOnDestroy() {
    this.subcriptions.unsubscribe();
  }

  mostra(e) {
    console.log("mostra(e)", e);
  }

  saveShop() {
    let finalList = [];
    this.attachedList = this.attachedList.map(a => {
      return { ...a, ...{ IsBackgroundImage: false, IsLogoImage: false } }
    });
    this.bannerList = this.bannerList.map(a => {
      return { ...a, ...{ IsBackgroundImage: true, IsLogoImage: false } }
    });    
    this.logoList = this.logoList.map(a => {
      return { ...a, ...{ IsBackgroundImage: false, IsLogoImage: true } }
    })
    finalList = [...this.attachedList, ...this.bannerList, ...this.logoList];
    console.log("this.finalList", finalList);
    console.log("formShop", this.formShop);

    this.managerShop.addShop({
      ...this.formShop.value, ...{
        Attachments: finalList
      }
    })
  }

  alertImage(disabled) {
    if (disabled) {
      let confirmDialogRef = this.confirmDialog.open(AlertComponent, {
        width: '500px',
        data: { menssage: "No puede agregar más de tres imagenes", type: "warning" }
      });

      confirmDialogRef.afterClosed().subscribe(result => {

      });
    }
  }

}
