import { Component } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { LocationStrategy } from "@angular/common";
import { HttpHelper } from "./common/helper/httpHelper";
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TSM Manager';

  constructor(router: Router, locationStrategy: LocationStrategy, httpHelper: HttpHelper) {
    router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        $(function () {
          $('#main-menu').smartmenus(
            {
              subMenusMaxWidth: '600px',
            }
          );
        });

      });

    //detect back/forward button press
    locationStrategy.onPopState(() => {
      httpHelper.hideLoader();
    });
  }  

  afterLoginMenuSet()
  {
    console.log("after login");
  }
}
