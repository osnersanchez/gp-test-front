import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collection-products',
  templateUrl: './collection-products.component.html',
  styleUrls: ['./collection-products.component.scss']
})
export class CollectionProductsComponent implements OnInit {

  @Input('prodCollection') prodCollection: Array<any> = [];
  selectedIndex = 0;


  constructor() { }

  ngOnInit() {
    // console.log(this.prodCollection);
    // this.categories = this.categories.concat(this.categories);
  }

  changeCategory(index) {
    this.selectedIndex = index;
  }

}
