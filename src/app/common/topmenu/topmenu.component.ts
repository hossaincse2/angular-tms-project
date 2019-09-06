import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { LocalStorageService } from "angular-web-storage";
import { UserService } from "../../services/userService";
import { GROUP_NAME } from "../QSEnums";
declare const $:any;
@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css'],
  providers: [UserService]
})
export class TopmenuComponent implements OnInit {

  public menuString: string = "";
  public errorFlag = false;
  public userID: string;
  private lstGroupName: any[];
  isMenuOpen = false;
  isRightMenuOpen = false;
  @ViewChild('one') d1: ElementRef;

  constructor(public localStorageService: LocalStorageService, private router: Router) {
  }

  ngOnInit() {
    this.lstGroupName = GROUP_NAME;
    this.userID = this.localStorageService.get("userID"); 

    // let objPermission: Permission = new Permission(); //todo remove start
    // objPermission.FormName = "User";
    // objPermission.GroupID = 1;
    // objPermission.PermissionName = "user"
    // let objPermission2: Permission = new Permission();
    // objPermission2.FormName = "Customer";
    // objPermission2.GroupID = 2;
    // objPermission2.PermissionName = "customer"
    // this.lstPermission.push(objPermission);
    // this.lstPermission.push(objPermission2);
    // this.makeMenu();//todo remove end
    let _self = this;
    $(document).on('click', function(e){
      let target = $(e.target);
      let selector = '.site-navbar ul.nav.navbar-nav li';
      if(target.closest(selector).length > 0){
        _self.isMenuOpen = false;
        _self.isRightMenuOpen = false;
      }
    })

  }

  logout() {
    this.localStorageService.clear();
    this.router.navigate(['/login']);
  }

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
    this.isRightMenuOpen = false;
  }
  toggleRightMenu(){
    this.isRightMenuOpen = !this.isRightMenuOpen;
    this.isMenuOpen = false;
  }
  shadeMenuToggle(){
    this.isMenuOpen = false;
    this.isRightMenuOpen = false;
  }

  

}
