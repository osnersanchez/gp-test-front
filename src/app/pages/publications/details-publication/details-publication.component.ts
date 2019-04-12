import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { Data, AppService } from '../../../app.service';
import { Product } from "../../../app.models";
import { emailValidator } from '../../../theme/utils/app-validators';
import { ZoomImgComponent } from './zoom-img/zoom-img.component';
import { PublicationsManagerService } from '../../../shared/subjects/publications-manager.service';
import { TokenStorageService } from '../../../shared/auth/token-storage.service';
import { ProductService } from '../../../shared/services/product.service';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { UserService } from '../../sign-in/user.service';
import { ShoppingCartManagerService } from '../../../shared/subjects/shopping-cart.service';
import { Environments } from '../../../../environments/environments.constanst';

@Component({
  selector: 'app-details-publication',
  templateUrl: './details-publication.component.html',
  styleUrls: ['./details-publication.component.scss']
})
export class DetailsPublicationComponent implements OnInit {
  @ViewChild('zoomViewer') zoomViewer;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;
  public config: SwiperConfigInterface = {};
  public product: Product;
  public image: any;
  public zoomImage: any;
  private sub: any;
  public form: FormGroup;
  public relatedProducts: Array<Product>;

  public publicationDetails;
  public loadDetails;
  public publicationId;

  public quantity: number = 1;
  public auctionOfferPrice: number;
  public loading: boolean = false;
  public enviroment = Environments.ENDPOINT

  public mockPublication = {
    like: false,
    quantitySold: 0,
    questionsAsked: 0
  }
  public listPublications = []

  constructor(
    public appService: AppService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
    public publicationService: PublicationsManagerService,
    public tokenService: TokenStorageService,
    public auctionService: ProductService,
    private route: Router,
    public snackBar: MatSnackBar,
    private shoppingCartProvider: ShoppingCartService,
    private userProvider: UserService,
    public shoppingCartManagerService: ShoppingCartManagerService
  ) { }

  ngOnInit() {
    this.publicationService.getLoadingDetails().subscribe((res) => { this.loadDetails = res; });
    this.publicationService.getPublicationDetails().subscribe((res) => {
      if (res) {
        try {
          res.ExternalLinks = JSON.parse(res.ExternalLinks);

        } catch (error) {

        }
        this.publicationDetails = res;
        this.zoomImage = this.enviroment + '/images/' + this.publicationDetails.photo;

      }
    });

    this.sub = this.activatedRoute.params.subscribe(params => {
      this.publicationId = params.Id;
      this.publicationService.loadPublicationDetails(this.publicationId);
    });

    this.publicationService.getPublicationsList(1).subscribe(list => {
      this.listPublications = list
    })


    this.form = this.formBuilder.group({
      'review': [null, Validators.required],
      'name': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': [null, Validators.compose([Validators.required, emailValidator])]
    });
    // this.getRelatedProducts();    
  }

  ngAfterViewInit() {
    this.config = {
      observer: false,
      slidesPerView: 4,
      spaceBetween: 10,
      keyboard: true,
      navigation: true,
      pagination: false,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3,
        }
      }
    }

  }


  // public getProductById(id){
  //   this.appService.getProductById(id).subscribe(data=>{
  //     this.product = data;
  //     this.image = data.images[0].medium;
  //     this.zoomImage = data.images[0].big;
  //     setTimeout(() => { 
  //       this.config.observer = true;
  //      // this.directiveRef.setIndex(0);
  //     });
  //   });
  // }

  // public getRelatedProducts(){
  //   this.appService.getProducts('related').subscribe(data => {
  //     this.relatedProducts = data;
  //   })
  // }

  public selectImage(image) {
    this.image = image.medium;
    this.zoomImage = image.big;
  }

  public onMouseMove(e) {
    if (window.innerWidth >= 1280) {
      var image, offsetX, offsetY, x, y, zoomer;
      image = e.currentTarget;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      x = offsetX / image.offsetWidth * 100;
      y = offsetY / image.offsetHeight * 100;
      zoomer = this.zoomViewer.nativeElement.children[0];
      if (zoomer) {
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
        zoomer.style.display = "block";
        zoomer.style.height = image.height + 'px';
        zoomer.style.width = image.width + 'px';
      }
    }
  }

  public onMouseLeave(event) {
    this.zoomViewer.nativeElement.children[0] && (this.zoomViewer.nativeElement.children[0].style.display = "none");
  }

  public openZoomViewer() {
    this.dialog.open(ZoomImgComponent, {
      data: this.zoomImage,
      panelClass: 'zoom-dialog'
    });
  }

  ngOnDestroy() {
    this.publicationService.resetPublication();
    this.sub.unsubscribe();
  }

  public onSubmit(values: Object): void {
    if (this.form.valid) {
      //email sent
    }
  }

  addToShoppingCart() {
    this.loading = true;
    let userId = this.tokenService.getUserId();
    if (userId) {
      let data = {
        idProduct: this.publicationDetails.id,
        quantity: this.quantity
      }
      this.shoppingCartProvider.post(data).subscribe((res) => {
        if (res) {
          this.loading = false;

          this.snackBar.open('Agregado al Carrito Exitosamente!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 5000 });
          this.shoppingCartProvider.getByUser('en_proceso').subscribe((response: any) => {
            const items = response;
            this.shoppingCartManagerService.setNumberOfItem(items);
          },
            error => console.log(error)
          );

          //redireccionar a la vista de carrito de compra
        }
      }, error => {
        this.snackBar.open('No se pudo añadir a su carrito!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
        console.log(error);
        this.loading = false;
      })
    } else {
      this.userProvider.setLastProductSelectedToBuy(
        this.publicationDetails.Id,
        this.quantity
      );
      this.route.navigate([`/sign-in`]);
    }
  }

  quantityAmount() {
    if (this.quantity > this.publicationDetails.QuantityAvailable) {
      this.quantity = this.publicationDetails.QuantityAvailable;
      (<HTMLInputElement>document.getElementById(`quantity`)).value = this.publicationDetails.QuantityAvailable.toString();
    }
  }

  doAuction() {
    this.loading = true;
    let userId = this.tokenService.getUserId();
    if (userId) {
      let data = {
        IdUser: parseInt(userId, 10),
        IdProduct: this.publicationDetails.Id,
        Offer: this.auctionOfferPrice,
        AuctionDate: new Date()
      }
      this.auctionService.createAuction(data).subscribe((res) => {
        if (res) {
          this.loading = false;
          this.snackBar.open('Puja Realizada Exitosamente!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 5000 });
          this.publicationService.loadPublicationDetails(this.publicationId);
          //redireccionar si es el caso
        }
      },
        error => {
          console.log(error);
          this.loading = false;
        });
    } else {
      this.route.navigate([`/sign-in`]);
    }
  }

}