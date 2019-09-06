import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/user';
import { UserService } from '../../services/userService';
import { ResponseStatus, UserStatus, USER_TYPES, TMS_USER_LEVEL } from '../../common/QSEnums';
import { MessageHelper } from '../../common/helper/messageHelper';
import { VMUnit } from '../../models/smModels/vmUnit';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService]
})
export class UserListComponent implements OnInit {

  public lstUser: Users[] = new Array<Users>()
  public lstVMUnit: VMUnit[] = new Array<VMUnit>();
  userLevel: any[];
  constructor(private userService: UserService, private messageHelper: MessageHelper, ) { }

  ngOnInit() {
    this.userLevel =TMS_USER_LEVEL;
    this.getAllUser();
  }

  public getAllUser() {
    this.userService.getUsersByType(USER_TYPES[0].id).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstUser = response.ResponseObj;
        this.lstUser.forEach(user => {
          var vmUnit = this.lstVMUnit.filter(v => v.Unit.UnitID == user.UnitID)[0];
          if (vmUnit) {
            user.UnitName = vmUnit.Unit.UnitName;
          }

          user.UserLevelName = this.userLevel.filter(u => u.id == user.UserLevel)[0].name;

        

          if (user.Status == UserStatus.Register) {
            user.StatusName = "Register";
          }
          else if (user.Status == UserStatus.Active) {
            user.StatusName = "Active";
          }
          else if (user.Status == UserStatus.Inactive) {
            user.StatusName = "Inactive";
          }
        })
      }
    });
  }

  activeUser(user) {
    if (confirm("Are you sure to active this user?")) {
      this.userService.activeUser(user).subscribe((response) => {
        if (response.StatusCode == ResponseStatus.success) {
          this.messageHelper.showMessage(ResponseStatus.success, "Activated successfully");
          this.getAllUser();
        }
        else {
          this.messageHelper.showMessage(ResponseStatus.fail, "Failed to active user");
        }
      });
    }

  }

  InActiveUser(user) {
    if (confirm("Are you sure to inactive this user?")) {
      this.userService.inActiveUser(user).subscribe((response) => {
        if (response.StatusCode == ResponseStatus.success) {
          this.messageHelper.showMessage(ResponseStatus.success, "Inactivated successfully");
          this.getAllUser();
        }
        else {
          this.messageHelper.showMessage(ResponseStatus.fail, "Failed to inactive user");
        }
      });
    }
  }

  editUser(user) {

  }

  getAllUserByFilter() {

  }

}
