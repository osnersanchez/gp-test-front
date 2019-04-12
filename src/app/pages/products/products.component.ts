import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ProductDialogComponent } from '../../shared/products-carousel/product-dialog/product-dialog.component';
import { AppService } from '../../app.service';
import { Product, Category } from "../../app.models";
import { HomeService } from '../../shared/services/home.service';
import { CategoryService } from '../../shared/services/category.service';
import Vibrant from 'node-vibrant';
import { OfferDialogComponent } from '../../shared/offer-dialog/offer-dialog.component';
import { ShopApiService } from '../../shared/services/shop-api.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen:boolean = true;
  private sub: any;
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public counts = [12, 24, 36];
  public count:any;
  public sortings = ['Sort by Default', 'Best match', 'Lowest first', 'Highest first'];
  public sort:any;
  public products: Array<Product> = [];
  public categories:Category[];
  public brands = [];
  public priceFrom: number = 750;
  public priceTo: number = 1599;
  public colors = ["#5C6BC0","#66BB6A","#EF5350","#BA68C8","#FF4081","#9575CD","#90CAF9","#B2DFDB","#DCE775","#FFD740","#00E676","#FBC02D","#FF7043","#F5F5F5","#000000"];
  public sizes = ["S","M","L","XL","2XL","32","36","38","46","52","13.3\"","15.4\"","17\"","21\"","23.4\""];
  public page:any;
  public searchValueParam  = '';

  public dataSearch;

  showStore: boolean = false;
  storeData: any;

  constructor(
    private activatedRoute: ActivatedRoute, 
    public appService:AppService, 
    public dialog: MatDialog, 
    private router: Router,
    private homeService: HomeService,
    private categoryService: CategoryService,
    private _shop: ShopApiService
  ) { }

  ngOnInit() {
    this.count = this.counts[0];
    this.sort = this.sortings[0];
    this.products = [];
    this.sub = this.activatedRoute.params.subscribe(params => {
      // console.log(params['searchValue']);
      // this.searchValueParam = params['queryParams'];
      // console.log(params)
      this.showStore = false;
      if  (params['queryParams']) {
        this.getSearchProducts(params['queryParams']);
      }

      if  (params['store']) {
        console.log('storeId', params['store']); 
        this.showStore = true;
        // this.getStore(params['store']);
        this.getStore(107);

        // this.getSearchProducts(params['queryParams']); 
      }      

      if (params['categoryId']) {
        this.getProductsByCategory(params['categoryId']);
      }
    });
    // this.searchManager.getSearchValue().subscribe(val=>this.searchVal = val)

    if(window.innerWidth < 960){
      this.sidenavOpen = false;
    };
    if(window.innerWidth < 1280){
      this.viewCol = 33.3;
    };

    this.getCategories();
    this.getBrands();
    // this.getAllProducts();
  }

  public getAllProducts(){
    this.appService.getProducts("featured").subscribe(data=>{
      this.products = data; 
      //for show more product  
      for (var index = 0; index < 3; index++) {
        this.products = this.products.concat(this.products);
      }

      this.products.forEach((product: any) => {
        Vibrant.from(product.Photo).getPalette((err, palette) => {
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
    });

    console.log(this.products)
  }

  // getCategories() {
  //   this.categoryService.get().subscribe((categories: any) => {
  //     this.categories = categories;
  //   });
  // }

  public getSearchProducts(keyword) {
    this.searchValueParam = keyword;
    this.homeService.getSearch(keyword).subscribe(
      (response: any) => {
        this.products = response;

        this.products.forEach((product: any) => {
          Vibrant.from(product.Photo).getPalette((err, palette) => {
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

      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  public getCategories(){
      this.categoryService.getCategoriesTreeList().subscribe((data: any) => {
        this.categories = data;
      });
  }

  public getBrands(){
    this.brands = this.appService.getBrands();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
    (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 25;
  }

  public changeCount(count){
    this.count = count;
    // this.getAllProducts(); 
  }

  public changeSorting(sort){
    this.sort = sort;
  }

  public changeViewType(viewType, viewCol){
    this.viewType = viewType;
    this.viewCol = viewCol;
  }

  public openProductDialog(product){   
    let dialogRef = this.dialog.open(ProductDialogComponent, {
        data: product,
        panelClass: 'product-dialog'
    });
    dialogRef.afterClosed().subscribe(product => {
      if(product){
        this.router.navigate(['/products', product.id, product.name]); 
      }
    });
  }

  public onPageChanged(event){
      this.page = event;
      // this.getAllProducts(); 
      window.scrollTo(0,0); 
  }

  public getProductsByCategory(categoryId) {
    const searchBody = {
      CategoryId: null
    };

    searchBody.CategoryId = categoryId;

    this.homeService.getSearchByParams(searchBody).subscribe(
      (response: any ) => {

        this.products = response;

        this.products.forEach((product: any) => {
          Vibrant.from(product.Photo).getPalette((err, palette) => {
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
      },
      (error: any ) => {
        console.log(error);
      },
    );
  }

  public onChangeCategory(event){
    // if(event.target){
    //   this.router.navigate(['/products', event.target.innerText.toLowerCase()]); 
    // }   
    // console.log(event);
    // if (!event) {
    //   this.getSearchProducts(this.searchValueParam);
    //   return;
    // }

    const searchBody = {
      CategoryId: null,
      StringSearch: null
    };

    searchBody.CategoryId = event.id;
    if (this.searchValueParam) {
      searchBody.StringSearch = this.searchValueParam;
    }

    this.homeService.getSearchByParams(searchBody).subscribe(
      (response: any ) => {

        this.products = response;

        this.products.forEach((product: any) => {
          Vibrant.from(product.Photo).getPalette((err, palette) => {
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
      },
      (error: any ) => {
        console.log(error);
      },
    );
  }

  public openOfferDialog(product){
    //ofertando por proyecto
    console.log("entrando en ofertas producto ", product);

    let dialogRef = this.dialog.open(OfferDialogComponent, {
      data: product,
      panelClass: 'product-dialog'
    });
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        console.log(res);

        if  (this.searchValueParam) {
          this.getSearchProducts(this.searchValueParam);
        } else  {
          this.getProductsByCategory(null);
        }
      }
    });
  }


  public getStore(id){
    this._shop.getShop(id).subscribe((res)=>{
      console.log("res tienda", res);      
      this.storeData = res;
      this.products = this.storeData.Products;
    })
  }
}