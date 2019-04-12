import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ShopApiService } from '../services/shop-api.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { MatSnackBar } from '@angular/material';
import { StoreService } from '../services/store.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShopManagerService {

  private _loadingShop: Subject<any> = new Subject();
  private _shop: BehaviorSubject<any> = new BehaviorSubject(null);
  private _listShop: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(
    private productsOrderService: ShopApiService,
    private storeService: StoreService,
    private tokenStorage: TokenStorageService,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  getShop() {
    return this._shop.asObservable();
  }
  getListShop() {
    return this._listShop.asObservable();
  }
  getLoadingShop() {
    return this._loadingShop.asObservable();
  }

  resetDetail() {
    this._shop.next(null);
  }

  addShop(value) {
    let session = this.tokenStorage.getSession();
    let owner = {
      Owner: {
        EmailAddress: session.emailAddress,
        EmailConfirmed: false, // sessions.emailConfirmed es string se requiere boolean
        FirstName: session.firstName,
        LastName: session.lastName,
        Token: "",
        UserName: ""
      },
      OwnerId: session.userId
    }
    let payload = { ...value, ...owner }
    console.log(payload);

    this._loadingShop.next(true);
    this.productsOrderService.addStore(payload).subscribe(res => {
      this._shop.next(res);
      this._loadingShop.next(false);

      this.snackBar.open('Tienda creada exitosamente!', '×', {
        panelClass: 'success',
        verticalPosition: 'top',
        duration: 3000
      });

    },
      err => {
        this._loadingShop.next(false);
        console.log("error al cargar la lista de productos");

        this.snackBar.open('error al cargar la lista de shop', '×', {
          panelClass: 'danger',
          verticalPosition: 'top',
          duration: 3000
        });

      });
  }

  loadShop(id) {
    this._loadingShop.next(true);
    this.storeService.getById(id).subscribe((data?: any) => {
      this._loadingShop.next(false);
      this._shop.next(data);
    }, err => {
      this._loadingShop.next(false);
    });
  }

  updateShop(shop) {
    let session = this.tokenStorage.getSession();
    let payload = {
      attached: this._shop.getValue().Attachments,
      OwnerId: session.userId,
      Name: shop.Name,
      Slogan: shop.Slogan
    }
    this._loadingShop.next(true);
    this.storeService.put(this._shop.getValue().Id, payload).subscribe(res => {
      this._loadingShop.next(false);
      this.router.navigate(['/my-shop'])
      this.snackBar.open('Tienda actualizada!', '×', {
        panelClass: 'success',
        verticalPosition: 'top',
        duration: 3000
      });

    },
      err => {
        this._loadingShop.next(false);
        this.snackBar.open('No se pudo actualizar', '×', {
          panelClass: 'danger',
          verticalPosition: 'top',
          duration: 3000
        });

      });
  }

  updateAttached(attached, type) {
    let aux;
    this._loadingShop.next(true);
    this.storeService.addAttachments({ ...attached, ...{ Id: this._shop.getValue().Id } }).subscribe((res:any) => {
      this._loadingShop.next(false);
      switch (type) {
        case 0:
          console.log("case 0 banner dentro del servicio");
          if (res.length)
            aux = { ...this._shop.getValue(), ...{ BackgroundImage: res[0].BackgroundImage } };
          break;
        case 1:
          console.log("case 1 logo dentro del servicio");
          if (res.length)
          aux = { ...this._shop.getValue(), ...{ LogoImage: res[0].LogoImage } };
          break;
        case 2:
          console.log("case 2 lista dentro del servicio");
          // this.lista = list.map(a => {
          //   console.log("a", a);
          //   return { ...a, ...{ IsBackgroundImage: false, IsLogoImage: false } }
          // });
          // this.uploadFile(this.imgLogoAttached, 2);
          let val = res.filter(a =>{
            return !(a.BackgroundImage == a.Url || a.LogoImage == a.Url)
          });
          aux = { ...this._shop.getValue(), ...{ Attachments: val} };
          break;
      }
      // if (res.length)
      //   aux = { ...this._shop.getValue(), ...{ Attachments: res, BackgroundImage:res[0].BackgroundImage, LogoImage: res[0].LogoImage } };
      this._shop.next(aux);
    }, err => {
      this._loadingShop.next(false);
    });

  }

  loadAllShop() {
    let session = this.tokenStorage.getSession();
    this._loadingShop.next(true);
    this.productsOrderService.getAllShop(session.userId).subscribe((res: any) => {
      this._loadingShop.next(false);
      this._listShop.next(res);
    }, err => {
      this._loadingShop.next(false);
    })
  }

  deleteAttached(id) {
    this._loadingShop.next(true);
    this.storeService.deleteAttachments(id).subscribe(res => {
      this._loadingShop.next(false);
      let newAttachments = this._shop.getValue().Attachments.filter(va => {
        return va.MultimediaId != id
      });

      let aux = { ...this._shop.getValue(), ...{ Attachments: newAttachments } };
      this._shop.next(aux);
      // this._responseDelAttached.next(res);
    }, err => {
      this._loadingShop.next(false);
      // this._responseDelAttached.error("");
    })
  }

}
