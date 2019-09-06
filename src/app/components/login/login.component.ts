import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { AuthGuardService } from "../../common/auth/auth.guard.service";
import { MessageHelper } from "../../common/helper/messageHelper";
import { ResponseStatus, USER_TYPES } from "../../common/QSEnums";
import { Users } from "../../models/user";
import { UserService } from "../../services/userService";
import { HeaderComponent } from '../../common/header/header.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService, HeaderComponent]
})

export class LoginComponent implements OnInit {

  public submitted: boolean = false;
  public objUser: Users = new Users();

  constructor(private authGuardService: AuthGuardService, private router: Router, private userService: UserService,
    private localStorageService: LocalStorageService, private messageHelper: MessageHelper,
    private headerComponent: HeaderComponent) {
  }

  ngOnInit(): void {
    if (this.localStorageService.get("token") && this.localStorageService.get("userType") == USER_TYPES[0].id) {
      this.router.navigate(['/dashboard']);
      this.authGuardService.setLoggedIn();
    }

  }


  public onSubmit(loginForm): void {

    this.submitted = true;
    if (loginForm.valid) {
      this.objUser.UserType = USER_TYPES[0].id;
      this.userService.verifyUser(this.objUser).subscribe((response) => {
        this.messageHelper.showMessage(response.responseCode, response.message);

        if (response.StatusCode == ResponseStatus.success) {

          this.localStorageService.set("token", response.Token);
          this.localStorageService.set("userID", this.objUser.UserID);
          this.localStorageService.set("userLevel", response.ResponseObj.UserLevel);
          this.localStorageService.set("userType", response.ResponseObj.UserTypeID);
          this.authGuardService.setLoggedIn();
          console.log("response", response.ResponseObj);
          this.headerComponent.showTopMenuBar(1, this.objUser.UserID);

          this.router.navigate(['/dashboard']);
          // if (response.ResponseObj.UserLevel == 1) {
          //   this.router.navigate(['/request']);
          // }
          // else {
          //   this.router.navigate(['/dashboard']);
          // }

        }
        else {
          this.messageHelper.showMessage(ResponseStatus.fail, "Invalid user name or password");
        }
      });

    }
  }


}

