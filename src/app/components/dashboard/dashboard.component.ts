import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public userLevel: number = 0;
  showMenu: boolean = false;
  showLogin: boolean = false;
  loginUserName: string;
  constructor(private localStorageService: LocalStorageService, private router: Router) { }

  ngOnInit() {
    this.userLevel = this.localStorageService.get("userLevel");
    console.log(this.userLevel);
    if (this.localStorageService.get("userID") != null) {
      this.loginUserName = this.localStorageService.get("userID");
      console.log("User Name", this.loginUserName);
      this.showMenu = true;
    }
    else {

      this.showLogin = false;
    }
  }

 

}
