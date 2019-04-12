import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Input } from '@angular/core';
// import * as $ from 'jquery';

@Component({
  selector: 'app-mask-loading',
  templateUrl: './mask-loading.component.html',
  styleUrls: ['./mask-loading.component.css']
})
export class MaskLoadingComponent implements OnInit, OnDestroy, AfterViewInit {


  @Input() loading: boolean;
  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    try {
      setTimeout(() => {
        let container = document.querySelector('app-mask-loading').parentElement
        container.style.position = 'relative';
        container.style['margin-bottom'] = '24px';
      }, 10);
    } catch (error) { }
  }

  ngOnDestroy(): void {
    let container = document.querySelector('app-mask-loading').parentElement
    container.removeAttribute("style")
  }

}
