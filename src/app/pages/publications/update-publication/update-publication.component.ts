import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { Data, AppService } from '../../../app.service';
import { Product } from "../../../app.models";
import { emailValidator } from '../../../theme/utils/app-validators';
import { PublicationsManagerService } from '../../../shared/subjects/publications-manager.service';
import { Subscription } from 'rxjs';
import { TokenStorageService } from '../../../shared/auth/token-storage.service';
import { StoreService } from '../../../shared/services/store.service';
import { MethodPaymentDialogComponent } from '../../../shared/method-payment-dialog/method-payment-dialog.component';
import { PublicationsApiService } from '../../../shared/services/publications-api.service';
import { AlertComponent } from '../../../shared/alert/alert.component';

// import { ZoomImgComponent } from './zoom-img/zoom-img.component';

@Component({
  selector: 'app-update-publication',
  templateUrl: './update-publication.component.html',
  styleUrls: ['./update-publication.component.scss']
})
export class UpdatePublicationComponent implements OnInit {
  isLinear = true;

  private susbcriptions: Subscription = new Subscription();
  public loading: boolean = false;
  public publication_title;
  public segundoStepNext = true;
  public lista = [];
  public cant: number = 0;
  months = [];
  years = [];

  productInformationForm: FormGroup;
  productTypeForm: FormGroup;
  productPlanForm: FormGroup;
  productAttachedForm: FormGroup;
  productLinkForm: FormGroup;
  // publicationTypeForm: FormGroup;
  paymentForm: FormGroup;
  publicationTypeVacioForm: FormGroup;

  invalidEmail: boolean = false;

  color = 'accent';
  checked = false;
  disabled = false;
  isChecked = false;

  //links
  public links = [];
  public horizontalStepper: boolean = false;

  panelOpenState = false;
  favoriteSeason: string;
  paymentMethod;
  categoriesList;
  planSelection;
  emailAddress: string;
  pagoExtra: number = 0;

  //tipo de publicación
  typePublicationData;
  AuctionStartDate: Date;
  AuctionChecked = false;
  AuctionPriceInit = 0;

  //publicacion de producto pagada
  isPublicationPay = false;
  StoreId;

  //valores para update
  private sub: any;
  public publicationId;
  public publicationDetails;
  public zoomImage: any;
  public quality: any;
  public externalLinks = [];

  public linkLength = 0;

  constructor(
    private publicationService: PublicationsManagerService,
    public dialog: MatDialog,
    public appService: AppService,
    public tokenSesion: TokenStorageService,
    public storeService: StoreService,
    private activatedRoute: ActivatedRoute,
    public confirmDialog: MatDialog
  ) { }

  ngOnInit() {
    this.susbcriptions.add(this.publicationService.getCategoriesList().subscribe((res) => { this.categoriesList = res; }));
    this.susbcriptions.add(this.publicationService.getLoadingDetails().subscribe(load => this.loading = load))

    this.storeService.getByUserId(this.tokenSesion.getUserid()).subscribe((res) => {
      this.StoreId = res[0].Id;
    });

    (window.innerWidth < 768) ? this.horizontalStepper = false : this.horizontalStepper = true;

    this.months = this.appService.getMonths();
    this.years = this.appService.getYears();

    this.emailAddress = this.tokenSesion.getemailAddress();

    this.susbcriptions.add(this.publicationService.getPublicationDetails().subscribe((res) => {
      if (res) {
        try {
          res.ExternalLinks = JSON.parse(res.ExternalLinks);
          this.linkLength = res.ExternalLinks.length;
          console.log(this.linkLength);
          console.log(res.ExternalLinks.length);


        } catch (error) {

        }
        this.publicationDetails = res;
        this.lista = [...this.publicationDetails.Attachments];
        this.cant = this.lista.length;
        console.log(this.lista);

      }
    }));

    this.sub = this.activatedRoute.params.subscribe(params => {
      this.publicationId = params.Id;
      this.publicationService.loadPublicationDetails(this.publicationId);
    });


  }

  ngOnDestroy() {
    this.publicationService.resetPublication();
    this.susbcriptions.unsubscribe();
  }

  saveImageList(list: any[]) {
    if (list.length) {
      list.forEach((element: Object) => {
        this.publicationService.addAttached(parseInt(this.publicationId), element);
      });
    }
  }

  removeLinks(x) {
    this.publicationDetails.ExternalLinks.splice(x, 1);
  }

  guardar() {
    this.publicationService.updatePublication(parseInt(this.publicationId), this.publicationDetails.ExternalLinks);
  }

  deleteAttached(id) {
    this.publicationService.deleteAttached(id);
  }

  isModified() {
    let aux = this.publicationDetails ? this.linkLength == this.publicationDetails.ExternalLinks.length : true;
    return aux;
  }

  imagenDelete(id) {
    let confirmDialogRef = this.confirmDialog.open(AlertComponent, {
      width: '500px',
      data: { menssage: "Esta seguro que desea eliminara esta imagen?", type: "confirm" }
    });

    confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAttached(id);
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

}
