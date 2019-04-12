import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  @Output() onimageList: EventEmitter<any> = new EventEmitter();
  @Output() onAddAttached: EventEmitter<any> = new EventEmitter();
  @Output() onAddFormData: EventEmitter<any> = new EventEmitter();
  @Output() onAlert: EventEmitter<any> = new EventEmitter();

  @Input() max = 0;
  @Input() lista = [];
  @Input() preview = true;
  @Input() disabled = false;
  @Input() cant = 0;
  @Input() simple = false;

  private filesArr: any[] = []
  public list64: any[] = [];
  constructor() { }

  ngOnInit() {
  }

  handleFileSelect(e?) {
    console.log(e);
    
    if (!e.target.files.length) return;

    // console.log(e.target.files);
    
    if(this.simple){
      this.list64 = [];
      this.filesArr = [];
    }


    let ref = this;

    if (!this.preview) this.filesArr = [];
    // console.log(e.target.files);
    
    this.filesArr = [...this.filesArr, ...Array.prototype.slice.call(e.target.files)];
    // console.log(this.filesArr);
    

    if (this.cant + this.filesArr.length > this.max) {
      this.filesArr.splice(this.max - this.cant);
      this.onAlert.emit(true);   
    }

    if (this.max > 0 && this.filesArr && this.filesArr.length > this.max) {
      this.filesArr.splice(this.max);
      this.onAlert.emit(true);
    }

    this.list64 = [];
    this.filesArr.forEach(function (f) {
      if (!f.type.match("image.*")) {
        return;
      }

      let reader = new FileReader();
      reader.onload = function (e: any) {
        let base64 = e.target.result;
        ref.list64.push(base64);
        // console.log(ref.list64);
      }
      reader.readAsDataURL(f);
    });

    this.emit();
  }

  delete(index){
    this.filesArr.splice(index,1);
    // console.log(this.filesArr);
    
    let parent = document.querySelector("#selectedFiles");
    let child = document.getElementById(`image${index}`);
    parent.removeChild(child);
    this.emit()
  }

  emit(){
    setTimeout(() => {
      this.onimageList.emit(this.list64);
      this.onAddAttached.emit(this.filesArr.map((e, index) => {
        let base = this.list64[index].split(",");

        return {
          Data: base[1],
          MimeType: e.type,
          Name: e.name,
        }
      }));
    }, 1000);
    
    let formData: FormData = new FormData();

    if (this.filesArr.length) {
      this.filesArr.forEach((e) => {
        formData.append(e.name, e, e.name);
      })
      this.onAddFormData.emit(formData);
    }
  }

}
