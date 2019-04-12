import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'attached',
  templateUrl: './attached.component.html',
  styleUrls: ['./attached.component.scss']
})
export class AttachedComponent implements OnInit {

  private filesArr: any[] = []

  @Input('file') public file = null;

  @Output()
  public onBase64: EventEmitter<any> = new EventEmitter();
  @Output()
  public onFormData: EventEmitter<any> = new EventEmitter();



  @Input()
  public fullSize = false;
  constructor() { }

  @Input() sizeTitle: string;
  @Input() title: string;

  ngOnInit() {
    console.log(this.file)
  }

  openGalery() {

  }

  upload(files) {
    if (!files)
      return;
      
    this.filesArr = [...this.filesArr, ...Array.prototype.slice.call([files])];
    let reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        this.file = reader.result
        // let imageDataBase64: any = reader.result;
        // imageDataBase64 = imageDataBase64.split(',')[1];
        // let val = {
        //   Name: 'image' + Math.random(),
        //   Data: imageDataBase64,
        //   MimeType: 'image/jpeg'
        // }

        this.onBase64.emit(reader.result);
      },
      false
    );

    reader.readAsDataURL(files);

    let formData: FormData = new FormData();

    if (this.filesArr.length) {
      this.filesArr.forEach((e) => {
        formData.append('photo', e, e.name);
      })
      this.onFormData.emit(formData);
    }

  }

  getHeight(ref) {
    return ref.offsetHeight - 15;
  }

  getWidth(ref) {
    return ref.offsetWidth - 15;
  }

}
