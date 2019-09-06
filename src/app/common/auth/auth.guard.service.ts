import { Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {LocalStorageService} from "angular-web-storage";
@Injectable()
export class AuthGuardService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private localStorageService: LocalStorageService,private router: Router) {

  }
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  setLoggedIn()
  {
    this.loggedIn.next(true);
  }
  logout(){
    this.loggedIn.next(false);
    this.router.navigate(['login']);
  }
  private hasToken() : boolean {
    return !!this.localStorageService.get(('token'));
  }
}
