import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MatDialog } from '@angular/material';

import { Data, AppService } from '../../app.service';
import { Product } from '../../app.models';


@Component({
	selector: 'app-shops-carousel',
	templateUrl: './shops-carousel.component.html',
	styleUrls: ['./shops-carousel.component.scss']
})
export class ShopsCarouselComponent implements OnInit {

	@Input('shops') shops: Array<Product> = [];
	palette;
	public config: SwiperConfigInterface = {};

	constructor(
		public appService: AppService,
		public dialog: MatDialog,
		private router: Router
		) {}

	ngOnInit() {
		console.log(this.shops);
	}

	ngAfterViewInit() {
		this.config = {
			observer: true,
			slidesPerView: 6,
			spaceBetween: 16,
			keyboard: true,
			navigation:  {
				nextEl: '.swiper-button-next.swipe-arrow.shop-carousel',
				prevEl: '.swiper-button-prev.swipe-arrow.shop-carousel',
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
					slidesPerView: 4
				}
			}
		};
  }
  
  goToStore(tienda) {
	this.router.navigate(['/products', { store: tienda.StoreId }]);
  }

  goToProduct(product) {
	this.router.navigate(['publications/publication/'+product.ProductId]);
  }
}
