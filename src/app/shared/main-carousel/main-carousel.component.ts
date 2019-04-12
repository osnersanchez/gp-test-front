import { Component, OnInit, Input } from '@angular/core';
import { SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.scss']
})
export class MainCarouselComponent implements OnInit {
  @Input('slides') slides: Array<any> = [];
 
  public config: SwiperConfigInterface = {};

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };
  
  constructor(public router: Router) { }

  ngOnInit() { }

  ngAfterViewInit(){
    this.config = {
      slidesPerView: 1,
      spaceBetween: 0,         
      keyboard: true,
      navigation: true,
      pagination: this.pagination,
      grabCursor: true,        
      loop: false,
      preloadImages: true,
      updateOnImagesReady: true,
      lazy:  {
        loadPrevNext: true,
        loadPrevNextAmount: 3,
        loadOnTransitionStart: true
    },     
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      speed: 500,
      effect: "slide",
      observer: true,
    }
  }

  goToCategory() {
    this.router.navigate(['/products', { categoryId: null  }]);
  }

}