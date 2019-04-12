import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Product } from '../../app.models';
import { ProductService } from '../services/product.service';
import { UserService } from '../../pages/sign-in/user.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Router } from '@angular/router';
import { PublicationsManagerService } from '../subjects/publications-manager.service';

@Component({
  selector: 'app-offer-dialog',
  templateUrl: './offer-dialog.component.html',
  styleUrls: ['./offer-dialog.component.scss']
})
export class OfferDialogComponent implements OnInit {
  
  public config: SwiperConfigInterface = {};
  public auctionOfferPrice: number;
  public quantity: number = 1;
  public loading: boolean = false;

  constructor(
    private shoppingCartProvider: ShoppingCartService,
    public tokenService: TokenStorageService,
    public auctionService: ProductService,
    public snackBar: MatSnackBar,
    private route: Router,
    private userProvider: UserService,
    public dialogRef: MatDialogRef<OfferDialogComponent>,

    public publicationService: PublicationsManagerService,
    @Inject(MAT_DIALOG_DATA) public product
  ) { 
    this.auctionOfferPrice = product.LastBid ? product.LastBid.Offer : product.Price ;
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.config = {
      slidesPerView: 1,
      spaceBetween: 0,         
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,        
      loop: false,
      preloadImages: false,
      lazy: true, 
      effect: "fade",
      fadeEffect: {
        crossFade: true
      }
    }
  }

  public close(): void {
    this.dialogRef.close();
  }

  doAuction(){
    
    console.log("ofertando por producto");
    this.loading = true;
    let userId = this.tokenService.getUserId();
    if(userId){
      let data = {
        IdUser : parseInt(userId, 10),
        IdProduct : this.product.Id,
        Offer : this.auctionOfferPrice,
        AuctionDate : new Date()
      }
      this.auctionService.createAuction(data).subscribe((res)=>{
        if(res){
          this.loading = false;
          this.snackBar.open('Puja Realizada Exitosamente!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 5000 });            
          this.dialogRef.close(true);                 
        }
      },
      error => {
        console.log(error);
        this.loading = false;       
      });
    }else{
      this.dialogRef.close();
      this.snackBar.open('Debe iniciar sesión para pujar!', '×', { panelClass: 'danger', verticalPosition: 'top', duration: 5000 });  
      this.route.navigate([`/sign-in`]);
    }
  }

}
