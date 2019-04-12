import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AppService } from '../../../app.service';
import { Category, Product } from '../../../app.models';
import { TokenStorageService } from '../../../shared/auth/token-storage.service';
import { Subscription } from 'rxjs';
import { ProductsOrderManagerService } from '../../../shared/subjects/products-order-manager.service';
import { ListDialogComponent } from './list-dialog/list-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen:boolean = true;
  private sub: any;
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public counts = [12, 24, 36];
  public count:any;
  public sortings = ['Ordenar por defecto', 'Mejor coincidencia', 'Más bajo primero', 'Más alto primero'];
  public sort:any;
  public products: Array<Product> = [];
  public categories:Category[];
  public brands = [];
  public priceFrom: number = 750;
  public priceTo: number = 1599;
  public colors = ["#5C6BC0","#66BB6A","#EF5350","#BA68C8","#FF4081","#9575CD","#90CAF9","#B2DFDB","#DCE775","#FFD740","#00E676","#FBC02D","#FF7043","#F5F5F5","#000000"];  
  public sizes = ["S","M","L","XL","2XL","32","36","38","46","52","13.3\"","15.4\"","17\"","21\"","23.4\""];
  public page:any;

  public estados = ["Aceptado","por Aceptar","Rechazado","Pendiente","Pausa"];
  public productList = [];
  public userId;
  public loadData;
  private refSubscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private activatedRoute: ActivatedRoute, 
    public appService:AppService, 
    public dialog: MatDialog, 
    private router: Router,
    private productsOrder: ProductsOrderManagerService,
    private tokenService: TokenStorageService
  ) { }

  ngOnInit() {
    this.userId = this.tokenService.getUserid();
    this.refSubscriptions.push(this.productsOrder.getLoadData().subscribe((res)=>{ this.loadData = res; }));
    console.log("this.producList")
    console.log(this.productList)
    this.refSubscriptions.push(this.productsOrder.getProductOrderList(this.userId).subscribe((res)=>{
      this.productList = [];
      if(res){
        res.forEach(x => {
          this.productList = [...this.productList,...x.Products];
        });
      }       
    }));

    this.count = this.counts[0];
    this.sort = this.sortings[0];
    this.sub = this.activatedRoute.params.subscribe(params => {
      //console.log(params['name']);
    });
    if(window.innerWidth < 960){
      this.sidenavOpen = false;
    };
    if(window.innerWidth < 1280){
      this.viewCol = 33.3;
    }; 
  }

  public getAllProducts(){
    this.productsOrder.loadProductOrderList(this.userId);
  }

  ngOnDestroy() {
    this.refSubscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });

    this.sub.unsubscribe();
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
    (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 25;
  }

  public changeCount(count){
    this.count = count;
    this.getAllProducts(); 
  }

  public changeSorting(sort){
    this.sort = sort;
  }

  public changeViewType(viewType, viewCol){
    this.viewType = viewType;
    this.viewCol = viewCol;
  }

  public openProductDialog(id){   
    let dialogRef = this.dialog.open(ListDialogComponent, {
        data: this.estados,
        panelClass: 'product-dialog',
        width: '500px'
    });
    dialogRef.afterClosed().subscribe(res => {
      // if(product){
      //   this.router.navigate(['/products', product.id, product.name]); 
      // }
      console.log("cerrando modal");
      console.log(res);
    });
  }

  public onPageChanged(event){
      this.page = event;
      this.getAllProducts(); 
      window.scrollTo(0,0); 
  }
}
