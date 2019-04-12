import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Product } from '../../app.models';
import { StoreService } from '../../shared/services/store.service';
import { Store } from '../../shared/models/store';
import { ProductService } from '../../shared/services/product.service';
import { HomeService } from '../../shared/services/home.service';
import Vibrant from 'node-vibrant';
import { TokenStorageService } from '../../shared/auth/token-storage.service';
import { Slider } from '../../shared/models/banner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public slides = [
    {
      title: 'Bienvenido a testGoodPanda',
      subtitle: 'Tu mejor opción para comprar y vender',
      image: 'assets/images/carousel/banner1.jpg'
    },
    {
      title: 'Encuentra los mejores articulos ',
      subtitle: '',
      image: 'assets/images/carousel/banner2.jpg'
    },
    {
      title: 'Los mejores precios',
      subtitle: 'Special for today',
      image: 'assets/images/carousel/banner3.jpg'
    },
    {
      title: 'La mayor varierdad',
      subtitle: '',
      image: 'assets/images/carousel/banner4.jpg'
    },
    {
      title: 'Calidad insuperable',
      subtitle: '',
      image: 'assets/images/carousel/banner5.jpg'
    }
  ];

  public brands = [];
  public sliders;
  public offerWeeks;
  public bestStores;
  public lastVisits;
  public popularCategories;
  public discover;
  public mayInterest;
  public relatedPurchasesByCategories;
  public featuredProducts: Array<Product>;
  public onSaleProducts: Array<Product>;
  public topRatedProducts: Array<Product>;
  public newArrivalsProducts: Array<Product>;
  public stores: Store[];

  constructor(
    public appService: AppService,
    private storeService: StoreService,
    private homeService: HomeService,
    private tokenStorageService: TokenStorageService,
    public router: Router,

  ) {}

  ngOnInit() {
    // this.getStores();
    this.getProducts();
    // this.getBrands();
  }

  public onLinkClick(e) {
    this.getProducts();
  }

  public getProducts() {
      this.homeService.getInitLanding(this.tokenStorageService.getUserId()).subscribe((home: any) => {
        this.sliders = home.Sliders;
        this.offerWeeks = home.OffersWeeks[0].Products;
        this.bestStores = home.BestStores;
        this.lastVisits = home.LastVisits;
        this.popularCategories = home.PopularCategories;
        this.relatedPurchasesByCategories = home.RelatedPurchasesByCategories;
        this.discover = home.Discover;
        this.mayInterest = home.MayInterest;
        console.log(this.relatedPurchasesByCategories);
        this.featuredProducts = home.Products;
        this.getColorOfImage(this.offerWeeks);
        this.getColorOfImage(this.lastVisits);

      });
  }

  public getStores() {
    this.storeService.get().subscribe((stores: any) => {
      this.stores = stores;
    });
  }

  public getBrands() {
    this.brands = this.appService.getBrands();
  }

  public getColorOfImage(productList) {

    productList.forEach((product: any) => {
      Vibrant.from(product.ProductUrl).getPalette((err, palette) => {
        if (palette) {
          if (palette.Vibrant) {
            product.BgColor = palette.Vibrant.getHex();
          } else {
            product.BgColor = '#d6282c';
          }
        } else {
          product.BgColor = '#d6282c';
        }
      });
    });
  }

  goToCategory(categoryId) {
    this.router.navigate(['/products', { categoryId: categoryId  }]);
  }
}
