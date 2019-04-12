import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MatDialog } from '@angular/material';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { Data, AppService } from '../../app.service';
import { Product } from '../../app.models';
import { OfferDialogComponent } from '../offer-dialog/offer-dialog.component';
import { resolve4 } from 'dns';

@Component({
  selector: 'app-products-carousel',
  templateUrl: './products-carousel.component.html',
  styleUrls: ['./products-carousel.component.scss']
})
export class ProductsCarouselComponent implements OnInit {
  @Input('products')
  products: Array<any> = [];

  @Input('productClassName')
  productClassName:string;

  @Input('productsTitle') productsTitle:string;
  palette;
  public config: SwiperConfigInterface = {};
  private toggle : boolean = false;
  
  constructor(
    public appService: AppService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.products);
  }

  onClickMe(a) {
    console.log(a);

    this.toggle = !this.toggle;    
    document.getElementById(a).innerHTML='favorite';
  
    if (this.toggle) {
      document.getElementById(a).innerHTML='favorite';
      document.getElementById(a).style.display = "flex";
    } else {
      document.getElementById(a).innerHTML='favorite_border';
       document.getElementById(a).style.display = "none";
    }
  }

  ngAfterViewInit() {
    this.config = {
      observer: true,
      slidesPerView: 6,
      spaceBetween: 16,
      keyboard: true,
      navigation:  {
				nextEl: '.swiper-button-next.swipe-arrow.'+this.productClassName,
				prevEl: '.swiper-button-prev.swipe-arrow.'+this.productClassName,
			},
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 2
        },
        960: {
          slidesPerView: 3
        },
        1280: {
          slidesPerView: 4
        },
        1500: {
          slidesPerView: 5
        }
      }
    };
  }

  public openProductDialog(product) {
    let dialogRef = this.dialog.open(ProductDialogComponent, {
      data: product,
      panelClass: 'product-dialog'
    });
    dialogRef.afterClosed().subscribe(product => {
      if (product) {
        this.router.navigate(['/publications/publication', product.Id]);
      }
    });
  }

// //cuando una publicacion es de tipo oferta
// ofertar(product){
//   //llamar a la ventada de dialogo

//   //si recibe una respuesta verdadera lanza el servicio, sino no sucede nada
// }

  public openOfferDialog(product){
    //ofertando por proyecto
    console.log("entrando en ofertas producto ", product);

    let dialogRef = this.dialog.open(OfferDialogComponent, {
      data: product,
      panelClass: 'product-dialog'
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res) {
        console.log(res);
        // this.router.navigate(['/']);
        this.router.navigate(['/publications/publication', product.Id]);
      }
    });
  }


}
