import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ShopApiService } from '../../../shared/services/shop-api.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ShopManagerService } from '../../../shared/subjects/shop-manager.service';
import { AlertComponent } from '../../../shared/alert/alert.component';

@Component({
  selector: 'app-update-shop',
  templateUrl: './update-shop.component.html',
  styleUrls: ['./update-shop.component.scss']
})
export class UpdateShopComponent implements OnInit, OnDestroy {

  public storeId;
  public detalleShop;
  public lista = [];
  public loading = false;
  public attachmentList;
  public LogoImage = '';
  public BackgroundImage = '';
  public bannerList = [];
  public imgLogoAttached = [];
  private subscriptions: Subscription = new Subscription();

  public formShop: FormGroup = this._formBuilder.group({
    Name: ['', Validators.required],
    Slogan: ['', Validators.required],
    // Owner: ['', Validators.required],
    // OwnerId: ['', Validators.required],
    // Attachments: ['', Validators.required]
  });

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private apiShop: ShopApiService,
    private manager: ShopManagerService,
    public snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    public confirmDialog: MatDialog
  ) { }

  ngOnInit() {
    this.subscriptions.add(this.manager.getLoadingShop().subscribe(lo => this.loading = lo));
    this.subscriptions.add(this.activatedRoute.params.subscribe(params => {
      this.storeId = params.Id;
      this.obtenerDetalle(this.storeId)
    }));

    this.subscriptions.add(this.manager.getShop().subscribe(shop => {
      if (shop) {
        this.detalleShop = shop;
        this.formShop.patchValue(shop);
        this.lista = this.detalleShop.Attachments;
        this.LogoImage = shop.LogoImage;
        this.BackgroundImage = shop.BackgroundImage;
        console.log("shop update -->", shop);
      }
    }));

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.manager.resetDetail();
  }

  obtenerDetalle(id) {
    this.manager.loadShop(id);
  }

  updateShop() {
    this.manager.updateShop(this.formShop.value)
  }

  saveImageList(list: any[], type: number) {
    console.log("saveImageList(list: any[]) ", list);
    if (list.length) {
      switch (type) {
        case 0:
          console.log("case 0 banner");
          this.bannerList = list.map(a => {
            console.log("a", a);
            return { ...a, ...{ IsBackgroundImage: true, IsLogoImage: false } }
          });
          this.uploadFile(this.bannerList, 0);
          break;
        case 1:
          console.log("case 1 logo");
          this.imgLogoAttached = list.map(a => {
            console.log("a", a);
            return { ...a, ...{ IsBackgroundImage: false, IsLogoImage: true } }
          });
          this.uploadFile(this.imgLogoAttached, 1);
          break;
        case 2:
          console.log("case 2 lista");
          this.lista = list.map(a => {
            console.log("a", a);
            return { ...a, ...{ IsBackgroundImage: false, IsLogoImage: false } }
          });
          this.uploadFile(this.lista, 2);
          break;
      }
    }

  }

  uploadFile(list: any[], type: number) {
    list.forEach((element: Object) => {
      this.manager.updateAttached(element, type);
      console.log("elementos imagenes", element);
    });
  }

  deleteAttached(id) {
    this.manager.deleteAttached(id);
  }

  deleteConfirm(id) {
    console.log("formShop");
    console.log(this.formShop);
    let confirmDialogRef = this.confirmDialog.open(AlertComponent, {
      width: '500px',
      data: { menssage: "Esta seguro de eliminar esta imagen?", type: "confirm" }
    });

    confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAttached(id);
      }
    });
  }

  openConfirm() {
    let confirmDialogRef = this.confirmDialog.open(AlertComponent, {
      width: '500px',
      data: { menssage: "Esta seguro de modificar esta tienda?", type: "confirm" }
    });

    confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateShop();
      }
    });
  }

  warningDelete() {
    let confirmDialogRef = this.confirmDialog.open(AlertComponent, {
      width: '500px',
      data: { menssage: "La imagen no puede ser eliminada. Agregue al menos 2 imagenes", type: "warning" }
    });
  }

  disabledImage(disabled) {
    if (disabled) {
      let confirmDialogRef = this.confirmDialog.open(AlertComponent, {
        width: '500px',
        data: { menssage: "No puede agregar más de tres imagenes", type: "warning" }
      });

      confirmDialogRef.afterClosed().subscribe(result => {


      });
    }
  }

  mostra(e) {
    console.log("mostra(e)", e);
  }

}

