import { Component, ViewEncapsulation, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { AppService } from '../../../../app.service';
import { Product } from '../../../../app.models';


@Component({
  selector: 'app-list-dialog',
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.scss']
})
export class ListDialogComponent implements OnInit {

  public config: SwiperConfigInterface = {};
  constructor(public appService:AppService, 
              public dialogRef: MatDialogRef<ListDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public statusList) { }

  ngOnInit() { 
    console.log("estado de la lista")
    console.log(this.statusList) 
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
    this.dialogRef.close(false);
  }

  public confirm(): void {
    //ejecutar servicio que procesa status
    this.dialogRef.close(true);
  }
}
