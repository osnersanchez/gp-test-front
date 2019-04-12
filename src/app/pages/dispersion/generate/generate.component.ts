import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss']
})
export class GenerateComponent implements OnInit {

  payments = [{name:"PayPal", value:"PayPal"},{name:"Openpay", value:"Openpay"}];

  constructor() { }

  ngOnInit() {
  }

  generarExcel(){
    console.log("generando excel")
  }

}
