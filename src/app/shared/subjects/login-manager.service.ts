import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginManagerService {

  private loggedIn = new BehaviorSubject(false);
  loggedInStatus = this.loggedIn.asObservable();

  constructor() { }

  setStatusLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

}
