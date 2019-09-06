import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  showMenu: boolean = false;
  showLogin: boolean = false;
  loginUserName: string;
  userLevel: number;

  @Output() onLoginChange = new EventEmitter();
  constructor(public localStorageService: LocalStorageService, private router: Router) {

  }

  ngOnInit() {
    this.onLoginChange.emit();
    this.userLevel = this.localStorageService.get("userLevel");
    if (this.localStorageService.get("userID") != null) {
      this.loginUserName = this.localStorageService.get("userID");
    }
    else {
      // $('#loginUserTitle').text(" ");
      // $('#securityMenu').css("display", "none");
      // $('#settingMenu').css("display", "none");
      this.showLogin = false;
    }

    this.showTopMenuBar(this.userLevel, this.loginUserName);
    // this.onmousehover();
    // this.showToggle();
  }


  showToggle() {
    $('.in .nav a').on('click', function () {
      $('.navbar-toggle').click(); //bootstrap 3.x by Richard
    });
    $(document).ready(function () {

      $("body").click(function (event) {
        // only do this if navigation is visible, otherwise you see jump in navigation while collapse() is called 
        if ($(".navbar-collapse").is(":visible") && $(".navbar-toggle").is(":visible")) {
          $('.navbar-collapse').collapse('toggle');
        }
      });

      $('.clickable').on('click', function () {
        $('.panel-body').toggle(); //bootstrap 3.x by Richard
      });

    });
  }

  onmousehover() {
    var mouse_position;
    var animating = false;
    //GET MOUSE POSITION
    $(document).mousemove(function (e) {
      //$("body").on("mousemove", function(mouse_pointer) {
      //console.log(mouse_pointer.pageX - $(window).scrollLeft());
      //mouse_position = mouse_pointer.pageX - $(window).scrollLeft();
      if (animating) {
        return;
      }
      mouse_position = e.clientX;

      // console.log(mouse_position);
      if (mouse_position <= 100) {
        //SLIDE IN MENU
        animating = true;
        $('#cms_bar').animate({
          left: 0,
          opacity: 1
        }, 200, function () {
          animating = false;
        });
        // console.log('menu shown');
      } else if (mouse_position > 100) {
        animating = true;
        $('#cms_bar').animate({
          left: -100,
          opacity: 0
        }, 500, function () {
          animating = false;
        });
        //  console.log('menu hidden');
      }
    });
  }


  logout() {
    this.localStorageService.clear();
    this.showLogin = false;
    this.router.navigate(['/home']);
    this.ngOnInit();
  }

  showTopMenuBar(uLevel, userName) {

    if (!uLevel && !userName) {
      $('#loginUserTitle').text();
    }


    console.log("UserName", userName);
    this.loginUserName = userName;
    $('#settingMenu').css("display", "none");
    if (userName) {
      $('#securityMenu').css("display", "none");
    }

    $('#loginUserTitle').text(userName);

    if (uLevel < 6) {
      this.showMenu = true;
    }
    else {
      $('#securityMenu').css("display", "block");
      $('#settingMenu').css("display", "block");
    }
  }



}
