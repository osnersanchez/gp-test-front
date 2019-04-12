import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit {
  @Input()
  stores;

  constructor() {}

  ngOnInit() {
    console.log(
      '%c Stores from menu Component',
      'color: #207c7e; font-weight: bold;'
    );
    console.log(this.stores);
  }

  public getBanner(index) {
    return this.stores[index];
  }

  public getBgImage(index) {
    let bgImage = {
      'background-image':
        index != null
          ? 'url(' + this.stores[index].Photo + ')'
          : 'url(https://via.placeholder.com/600x400/ff0000/fff/)'
    };
    return bgImage;
  }
}
