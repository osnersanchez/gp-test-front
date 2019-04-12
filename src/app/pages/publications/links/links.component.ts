import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {

  productLinkForm: FormGroup;  

  @Input() links = [];
  @Output() onLinks : EventEmitter<any> = new EventEmitter();

  public linkType = [
    { name: 'Video', value: 'video' },
    { name: 'PDF', value: 'pdf' },
    { name: 'Link', value: 'link' }
  ];

  constructor() { }

  ngOnInit() {
    this.syncProductInformationForm();
  }

  private syncProductInformationForm() {    
    this.productLinkForm = new FormGroup({
      type: new FormControl(null, Validators.required),
      link: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required)
    });
  }

  AddLink() {
    console.log("AddLink() --> links.component (hijo)");
    this.links.push(this.productLinkForm.value);
    this.productLinkForm.reset();
    this.onLinks.emit(this.links);
  }

}
