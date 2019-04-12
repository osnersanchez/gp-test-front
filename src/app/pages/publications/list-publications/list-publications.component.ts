import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ProductDialogComponent } from '../../../shared/products-carousel/product-dialog/product-dialog.component';
import { AppService } from '../../../app.service';
import { Category, Product } from '../../../app.models';
import { TokenStorageService } from '../../../shared/auth/token-storage.service';
import { PublicationsManagerService } from '../../../shared/subjects/publications-manager.service';
import { SearchManagerService } from '../../../shared/subjects/search-manager.service';
import { Environments } from '../../../../environments/environments.constanst';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-publications',
  templateUrl: './list-publications.component.html',
  styleUrls: ['./list-publications.component.scss']
})
export class ListPublicationsComponent implements OnInit {


  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen: boolean = true;
  private sub: Subscription = new Subscription();
  public viewType: string = 'grid';
  public widthCol: number = 25;
  public gap = 15;
  public viewCol: string = this.viewCal(25);
  public counts = [12, 24, 36];
  public count: any;
  public sortings = ['Ordenar por defecto', 'Mejor coincidencia', 'Más bajo primero', 'Más alto primero'];
  public sort: any;
  public products: Array<Product> = [];
  public categories: Category[];
  public brands = [];
  public priceFrom: number = 750;
  public priceTo: number = 1599;
  public colors = ["#5C6BC0", "#66BB6A", "#EF5350", "#BA68C8", "#FF4081", "#9575CD", "#90CAF9", "#B2DFDB", "#DCE775", "#FFD740", "#00E676", "#FBC02D", "#FF7043", "#F5F5F5", "#000000"];
  public sizes = ["S", "M", "L", "XL", "2XL", "32", "36", "38", "46", "52", "13.3\"", "15.4\"", "17\"", "21\"", "23.4\""];
  public page: any;

  public publicationsList = [];
  public userId;
  public loadData;
  public searchVal = "";
  public propertiesSearch = ["Title", ""]
  public enviroment = Environments.ENDPOINT

  constructor(
    private activatedRoute: ActivatedRoute,
    public appService: AppService,
    public dialog: MatDialog,
    private router: Router,
    private publicationService: PublicationsManagerService,
    public tokenService: TokenStorageService,
    private searchManager: SearchManagerService
  ) { }

  ngOnInit() {
    this.userId = this.tokenService.getUserid();
    this.sub.add(this.publicationService.getLoadPublications().subscribe((res) => {
      this.loadData = res;
    }));
    this.sub.add(this.publicationService.getPublicationsList(this.userId).subscribe((res) => {
      this.publicationsList = res;
    }));

    this.sub.add(this.activatedRoute.params.subscribe((params: any) => {
        this.search(params.search,params.key);
      }));
      
      this.sub.add(this.activatedRoute.queryParams.subscribe((params:any) => {
          this.search(params.search,params.key);
    }));

    this.sub.add(this.searchManager.getSearchValue().subscribe(val => this.searchVal = val))

    this.count = this.counts[0];
    this.sort = this.sortings[0];
    this.sub.add(this.activatedRoute.params.subscribe(params => {
      //console.log(params['name']);
    }));
    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
    };
    if (window.innerWidth < 1280) {
      this.changeViewType("grid", 33.33);

    };
  }

  search(query, key) {
    if(query){
      this.publicationService.seacrchKey(query);
      return;
    }
    if(key){
      this.publicationService.seacrchCategori(key);
      return;
    }
    this.getAllProducts();
  }

  public getAllProducts() {
    this.publicationService.loadPublicationsList(this.userId);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
    this.changeViewType("grid", (window.innerWidth < 1280) ? 33.33 : 25)
    // (window.innerWidth < 1280) ? this.viewCol = 31 : this.viewCol = 22.8;
  }

  public changeCount(count) {
    this.count = count;
    this.getAllProducts();
  }

  public changeSorting(sort) {
    this.sort = sort;
  }

  public changeViewType(viewType, widthCol) {
    this.viewType = viewType;
    this.widthCol = widthCol
    this.viewCol = this.viewCal(this.widthCol);
  }

  public openProductDialog(product) {
    let dialogRef = this.dialog.open(ProductDialogComponent, {
      data: product,
      panelClass: 'product-dialog'
    });
    dialogRef.afterClosed().subscribe(product => {
      if (product) {
        this.router.navigate(['/products', product.id, product.name]);
      }
    });
  }

  public onPageChanged(event) {
    this.page = event;
    this.getAllProducts();
    window.scrollTo(0, 0);
  }

  viewCal(width) {
    return `0 0 calc(${width}%-${this.gap * 2}px)`
  }

}
