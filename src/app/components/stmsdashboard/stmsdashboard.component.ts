import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
declare var $: any;

@Component({
  selector: 'app-stmsdashboard',
  templateUrl: './stmsdashboard.component.html',
  styleUrls: ['./stmsdashboard.component.css']
})
export class STMSDashboardComponent implements OnInit {
  showMenu: boolean = false;
  showLogin: boolean = false;
  showPOLManagement: boolean = true;
  userLevel: number;
  @Output() change = new EventEmitter();

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.userLevel = this.localStorageService.get("userLevel");

    console.log("user Level", this.userLevel);
    if (this.userLevel == 10 || this.userLevel == 7) {
      this.showPOLManagement = false;
    }
    if (this.userLevel == 6) {
      // location.reload();
      //window.location.reload(true);
      // this.ngOnInit();
      // $(location).attr('href', 'http://localhost:4200/#/smsDashboard')

    }


    if (this.localStorageService.get("userID") != null) {

      this.showMenu = true;
    }
    else {
      this.showLogin = false;
    }
  }

}
