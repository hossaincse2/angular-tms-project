import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ResponseStatus, USER_TYPES } from '../../common/QSEnums';
import { AuthGuardService } from '../../common/auth/auth.guard.service';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
import { MessageHelper } from '../../common/helper/messageHelper';
import { Users } from '../../models/user';
import { UserService } from '../../services/userService';
import { HeaderComponent } from '../../common/header/header.component';


@Component({
  selector: 'app-ssd-login',
  templateUrl: './ssd-login.component.html',
  styleUrls: ['./ssd-login.component.scss'],
  providers: [UserService, HeaderComponent]
})
export class SsdLoginComponent implements OnInit {
  showLogin: boolean = false;
  public submitted: boolean = false;
  public objUser: Users = new Users();
  spinnerService: any;


  constructor(private authGuardService: AuthGuardService, private router: Router,
    private userService: UserService, private headerComponent: HeaderComponent,
    private localStorageService: LocalStorageService, private messageHelper: MessageHelper) {
  }

  ngOnInit(): void {

    console.log("user type", this.localStorageService.get("userType"));
    console.log("user type", USER_TYPES[1].id);


    if (this.localStorageService.get("token") && this.localStorageService.get("userType") == USER_TYPES[1].id) {
      this.router.navigate(['/smsDashboard']);
      this.authGuardService.setLoggedIn();
    }

  }




  public onSubmit(loginForm): void {



    this.submitted = true;
    if (loginForm.valid) {
      //  this.localStorageService.set("businessID", "0");

      this.objUser.UserType = USER_TYPES[1].id;
      this.userService.verifyUser(this.objUser).subscribe((response) => {
        this.messageHelper.showMessage(response.responseCode, response.message);

        if (response.StatusCode == ResponseStatus.success) {
          console.log("response", response.ResponseObj);
          this.localStorageService.set("token", response.Token);
          this.localStorageService.set("userID", this.objUser.UserID);
          this.localStorageService.set("userLevel", response.ResponseObj.UserLevel);
          this.localStorageService.set("userType", response.ResponseObj.UserTypeID);
          this.authGuardService.setLoggedIn();
          console.log("user type", this.localStorageService.get("userType"));

          if (this.localStorageService.get("userID") != null) {
            this.showLogin = true;
          }
          else {
            this.showLogin = false;
          }

          this.headerComponent.showTopMenuBar(response.ResponseObj.UserLevel,this.objUser.UserID);

          // this.router.navigate(['/smsDashboard']);
          this.ngOnInit();
          this.router.navigateByUrl('/smsDashboard');
          // this.load(this.router.navigate(['/smsDashboard']));
          // location.reload();
        }
        else {
          this.messageHelper.showMessage(ResponseStatus.fail, "Invalid user name or password");
        }
      });

    }
  }
  // load(val) {
  //   if (val == this.router.url) {
  //     this.spinnerService.show();
  //     this.router.routeReuseStrategy.shouldReuseRoute = function () {
  //       return false;
  //     };
  //    }
  //   }
}
