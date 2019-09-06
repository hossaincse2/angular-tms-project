import { Component, OnInit } from '@angular/core';
import { UserRole } from '../../models/smModels/userRole';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent implements OnInit {
  showEntry: boolean = false;
  public objUserRole: UserRole = new UserRole();
  public lstUserRole: UserRole[] = new Array<UserRole>();
  constructor() { }

  ngOnInit() {
    this.showEntry = false;
  }
  close() {
    this.showEntry = false;
  }

  saveUserRole() {

  }
  addNew() {

  }

  editUserRole(userRole)
  {

  }

  deleteUserRole(userRole)
  {

  }
}
