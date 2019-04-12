import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MatDialog } from '@angular/material';
import { Data, AppService } from '../../app.service';
import { Product } from "../../app.models";
import { Environments } from '../../../environments/environments.constanst';

@Component({
  selector: 'app-products-related',
  templateUrl: './products-related.component.html',
  styleUrls: ['./products-related.component.scss']
})
export class ProductsRelatedComponent implements OnInit {

  @Input('products') products = [];
  public config: SwiperConfigInterface = {};
  public widthCard = 250;
  public margin = 15;
  public enviroment = Environments.ENDPOINT


  constructor(public appService: AppService, public dialog: MatDialog, private router: Router) { }

  @ViewChild('related', { read: ElementRef }) public related: ElementRef<any>;

  ngOnInit() {
  }

  move(move) {
    let aux = this.related.nativeElement.scrollLeft   + ((move>0? (this.widthCard+this.margin*2):(-this.widthCard-this.margin*2))*4);
    this.related.nativeElement.scrollTo({left: aux , top: 0, behavior: 'smooth'});
  }

  // public openProductDialog(product){   
  //   let dialogRef = this.dialog.open(ProductDialogComponent, {
  //       data: product,
  //       panelClass: 'product-dialog'
  //   });
  //   dialogRef.afterClosed().subscribe(product => {
  //     if(product){
  //       this.router.navigate(['/products', product.id, product.name]); 
  //     }
  //   });
  // }
}
