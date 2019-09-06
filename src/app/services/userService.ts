
import { Observable } from 'rxjs';
import {Injectable } from '@angular/core';
import { HttpHelper } from '../common/helper/httpHelper';

@Injectable()
export class UserService {
  constructor(private httpHelper: HttpHelper) {
  }

  saveUser(obj): Observable<any> {
    let url = "api/User/SaveUser";
    return this.httpHelper.postHelper(url, obj);
  }
  getUserLog(obj): Observable<any> {
    let url = "api/User/getUserLog";
    return this.httpHelper.postHelper(url, obj);
  }
  updateUser(obj): Observable<any> {
    let url = "api/User/UpdateUser";
    return this.httpHelper.postHelper(url, obj);
  }

  activeUser(obj): Observable<any> {
    let url = "api/User/ActiveUser";
    return this.httpHelper.postHelper(url, obj);
  }

    inActiveUser(obj): Observable<any> {
    let url = "api/User/InactiveUser";
    return this.httpHelper.postHelper(url, obj);
  }
  getUsers(): Observable<any> {
    let url = "api/User/SearchUser";
    return this.httpHelper.postHelper(url, {});
  }

  getUserByID(obj): Observable<any> {
    let url = "api/User/GetUserByID";
    return this.httpHelper.postHelper(url, obj);
  }

  getUsersByType(obj): Observable<any> {
    let url = "api/User/SearchUserByType";
    return this.httpHelper.postHelper(url, obj);
  }
  getUserByBANo(obj): Observable<any> {
    let url = "api/User/getUserByBANo";
    return this.httpHelper.postHelper(url, obj);
  }

  verifyUser(obj): Observable<any> {
    let url = "api/User/VerifyUsers";
    return this.httpHelper.postHelper(url, obj);
  }

  getUserPermissionMapping(obj): Observable<any> {
    let url = "api/Security/SearchAllPermissionByUserID";
    return this.httpHelper.postHelper(url, obj);
  }

}

