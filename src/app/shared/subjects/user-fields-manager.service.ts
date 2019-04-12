import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserFieldsManagerService {

  private fullname = new BehaviorSubject('');
  fullnameField = this.fullname.asObservable();

  constructor() { }

  setFullName(value: string) {
    this.fullname.next(value);
  }

}
