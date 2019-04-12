import { Injectable } from '@angular/core';
import { PublicationsApiService } from '../services/publications-api.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { first } from 'rxjs/internal/operators';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { unusedValueExportToPlacateAjd } from '@angular/core/src/render3/interfaces/query';

@Injectable({
  providedIn: 'root'
})
export class PublicationsManagerService {

  private _responseAddAttached: Subject<any> = new Subject();
  private _responseDelAttached: Subject<any> = new Subject();
  private _responsePublication: Subject<any> = new Subject();
  private _categoriesList: BehaviorSubject<any> = new BehaviorSubject(null);
  private _publicationsList: BehaviorSubject<any> = new BehaviorSubject(null);
  private _plantList: BehaviorSubject<any> = new BehaviorSubject([]);
  private _unitList: BehaviorSubject<any> = new BehaviorSubject([]);

  private _publicationDetail: BehaviorSubject<any> = new BehaviorSubject(null);
  private _loadingDetails: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _loadPublications: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private publicationsService: PublicationsApiService,
    public snackBar: MatSnackBar
  ) {
    this.getResponsePublication().subscribe(res => {
      this.router.navigate(['/publications']);
      this.snackBar.open(res, '×', {
        panelClass: 'success',
        verticalPosition: 'top',
        duration: 6000
      });
    }, err => {
      this.snackBar.open(err, '×', {
        panelClass: 'warning',
        verticalPosition: 'top',
        duration: 6000
      });
    });

    this.getResponseAddAttached().subscribe(val => {
      // this.router.navigate(['/publications']);
      let aux = this._publicationDetail.getValue();
      aux.Attachments = [...val];
      this._publicationDetail.next(aux);
      this.snackBar.open('Imagenes agregadas!', '×', {
        panelClass: 'success',
        verticalPosition: 'top',
        duration: 6000
      });
    }, err => {
      this.snackBar.open('Ocurrido un Error al susbir las imagenes!', '×', {
        panelClass: 'warning',
        verticalPosition: 'top',
        duration: 6000
      });
    });

    this.getResponseDelAttached().subscribe(val => {
      let aux = this._publicationDetail.getValue();
      aux.Attachments = [...val];
      this._publicationDetail.next(aux);
      this.snackBar.open('Imagen Eliminada!', '×', {
        panelClass: 'success',
        verticalPosition: 'top',
        duration: 6000
      });
    }, err => {
      this.snackBar.open('Ocurrido un Error al eliminar la imagen!', '×', {
        panelClass: 'warning',
        verticalPosition: 'top',
        duration: 6000
      });
    });

  }

  getResponsePublication() {
    return this._responsePublication.asObservable();
  }

  getResponseAddAttached() {
    return this._responseAddAttached.asObservable();
  }

  getResponseDelAttached() {
    return this._responseDelAttached.asObservable();
  }

  getPublicationsList(id) {
    // this.loadPublicationsList(id);
    return this._publicationsList.asObservable();
  }

  getPublicationDetails() {
    return this._publicationDetail.asObservable();
  }

  getCategoriesList() {
    this.loadCategories();
    return this._categoriesList.asObservable();
  }

  getLoadingDetails() {
    return this._loadingDetails.asObservable();
  }

  getLoadPublications() {
    return this._loadPublications.asObservable();
  }

  getPlantList() {
    return this._plantList.asObservable();
  }

  getUnitList() {
    return this._unitList.asObservable();
  }

  resetPublication() {
    this._publicationDetail.next(null);
  }

  loadPublicationsList(id) {
    this._loadPublications.next(true);
    this.publicationsService.getPublicationsList(id).subscribe(res => {
      this._publicationsList.next(res);
      this._loadPublications.next(false);
    },
      err => {
        console.log("error al cargar la lista de publicaciones");
        this._loadPublications.next(false);
      }
    )
  }

  loadPublicationDetails(id) {
    this._loadingDetails.next(true);
    this.publicationsService.getPublicationDetails(id).subscribe((res: any) => {
      this._publicationDetail.next(res);
      this._loadingDetails.next(false);
    },
      err => {
        console.log("error al cargar los detalles de la publicacion");
        this._loadingDetails.next(false);
      }
    )
  }

  seacrchCategori(id) {
    this._loadPublications.next(true);
    this.publicationsService.getPublicationsCategory(id).subscribe((res: any) => {
      this._publicationsList.next(res.products);
      this._loadPublications.next(false);
    },
      err => {
        console.log("error al cargar los detalles de la publicacion");
        this._loadPublications.next(false);
      }
    )
  }
 
  seacrchKey(id) {
    this._loadPublications.next(true);
    this.publicationsService.getPublicationsKey(id).subscribe((res: any) => {
      this._publicationsList.next(res);
      this._loadPublications.next(false);
    },
      err => {
        console.log("error al cargar los detalles de la publicacion");
        this._loadPublications.next(false);
      }
    )
  }

  loadCategories() {
    this.publicationsService.getCategories().pipe(first()).subscribe((res) => {
      this._categoriesList.next(res);
    }, error => {
      console.log("error al cargar las categorias");
    });
  }

  addPublication(val) {
    console.log(val);
    var AllowVisits = false;
    if (val.AllowVisits) {
      AllowVisits = true;
    }
    this._loadingDetails.next(true);
    let payload = {
      UserId: parseInt(this.tokenStorage.getUserid()),
      Title: val.Title,
      Description: val.Description,
      Price: JSON.stringify(val.Price),
      Stock: JSON.stringify(val.Stock),
      Currency: 0,
      Qualities: val.Qualities,
      SaleType: val.SaleType,
      DeliveryTime: JSON.stringify(val.DeliveryTime),
      ExternalLinks: JSON.stringify(val.ExternalLinks),
      CategoryId: JSON.stringify(val.CategoryId),
      StoreId: val.StoreId,
      PlanId: val.PublicationPlan ? val.PublicationPlan : 0,
      InitDate: val.InitDate ? val.InitDate : null,
      ExpireDate: "2018-10-22T12:22:22-04:00",
      ContactEmail: val.ContactEmail ? val.ContactEmail : null,
      PhoneNumber1: val.PhoneNumber1 ? val.PhoneNumber1 : null,
      PhoneNumber2: val.PhoneNumber2 ? val.PhoneNumber2 : null,
      ReservePrice: val.ReservePrice ? val.ReservePrice : 0,
      AllowVisits: AllowVisits
    }

    this.publicationsService.postPublication(payload).subscribe((res: any) => {
      if (val.attached) {
        this.addAttachedNewPublication(res.Id, val.attached);
      } else {
        this._loadingDetails.next(false);
      }
      this._responsePublication.next("Publicacion creada");

    }, err => {
      this._loadingDetails.next(false);
      this._responsePublication.error("Error al crear la publicaion");

    })
  }

  updatePublication(id, externalLinks) {
    let payload = {
      Id: id,
      ExternalLinks: JSON.stringify(externalLinks)
    }
    this._loadingDetails.next(true);
    this.publicationsService.updatePublication(id, payload).subscribe(res => {
      this._loadingDetails.next(false);
      this._responsePublication.next("Publicacion actualizada");
    }, err => {
      this._responsePublication.error("Error al actualizar");
      this._loadingDetails.next(false);
    })
  }

  addAttachedNewPublication(id, attached) {
    this._loadingDetails.next(true);
    this.publicationsService.uploadAttached(id, attached).subscribe(res => {
      this._loadingDetails.next(false);
      // this._responseAddAttached.next(res);
    }, err => {
      this._responseAddAttached.error("");
      this._loadingDetails.next(false);
    })
  }

  addAttached(id, attached) {
    this._loadingDetails.next(true);
    this.publicationsService.addAttached({ ...attached, ...{ Id: id } }).subscribe(res => {
      this._loadingDetails.next(false);
      this._responseAddAttached.next(res);
    }, err => {
      this._responseAddAttached.error("");
      this._loadingDetails.next(false);
    })
  }

  deleteAttached(id) {
    this.publicationsService.deleteAttached(id).subscribe(res => {
      this._loadingDetails.next(false);
      this._responseDelAttached.next(res);
    }, err => {
      this._loadingDetails.next(false);
      this._responseDelAttached.error("");
    })
  }

  loadAllPlans() {
    this.publicationsService.getPlans().subscribe(plans => {
      console.log(plans);
      this._plantList.next(plans);
    })
  }

  loadAllUnits() {
    this.publicationsService.getUnitsList().subscribe(unitsList => {
      console.log(unitsList);
      this._unitList.next(unitsList);
    })
  }

}
