import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MessageHelper } from '../../common/helper/messageHelper';
import { UserService } from '../../services/userService';
import { Users } from '../../models/user';
import { USER_TYPES, USER_STATUS, SMS_USER_LEVEL, ResponseStatus, UserStatus } from '../../common/QSEnums';
import { VMUnit } from '../../models/smModels/vmUnit';
import { UnitService } from '../../services/unitService';

@Component({
  selector: 'app-smuser',
  templateUrl: './smuser.component.html',
  styleUrls: ['./smuser.component.css'],
  providers: [MessageHelper, UserService, UnitService]
})
export class SMUserComponent implements OnInit {
  initialLoadingFlag = true;
  addUserRoleMappingDisplay = "none";
  hideUserRoleMapping = false;
  editStateFlag: boolean;
  mismatchPassword: boolean = false;
  userTypes: any[];
  userLevel: any[];
  userStatus: any[];
  retypePassword: string;
  public objUser: Users = new Users();
  showEntry: boolean = false;
  public lstUser: Users[] = new Array<Users>()

  public numberOfRow = 0;
  public rowsOnPage = 10;
  public activePage = 1;
  public sortBy = "UserRoleMappingName";
  public sortOrder = "asc";
  public itemsTotal = 0;
  public lstVMUnit: VMUnit[] = new Array<VMUnit>();
  public file_srcs: string;
  _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];
  // The next two lines are just to show the resize debug
  // they can be removed
  public debug_size_before: string[] = [];
  public debug_size_after: string[] = [];

  constructor(private messageHelper: MessageHelper, private changeDetectorRef: ChangeDetectorRef,
    private userService: UserService, private unitService: UnitService) {
  }

  ngOnInit() {
    this.userTypes = USER_TYPES;
    this.userStatus = USER_STATUS;
    this.userLevel = SMS_USER_LEVEL;
    this.getAllUnit();
    this.editStateFlag = false;
    this.mismatchPassword = false;
  }

  public onPageChange(event) {
    this.rowsOnPage = event.rowsOnPage;
    this.activePage = event.activePage;
  }

  getAllUnit() {
    this.unitService.getAllUnitForRegistration().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {

    
        this.lstVMUnit = response.ResponseObj;
        console.log("unit List" ,this.lstVMUnit);
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }

  addNew() {
    this.objUser = new Users();
    this.showEntry = true;
  }

  close() {
    this.objUser = new Users();
    this.showEntry = false;
  }


  chackPassword() {
    if (this.objUser.Password && this.objUser.cpassword) {
      if (this.objUser.Password != this.objUser.cpassword) {
        this.mismatchPassword = true;
      }
      else {
        this.mismatchPassword = false;
      }
    }
  }




  public saveUser() {

    this.objUser.UserType = USER_TYPES[1].id;

    this.userService.saveUser(this.objUser).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, response.Message);
        this.objUser = new Users();
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, response.Message);
      }
    });
  }

  public checkUserLevel() {
    // var uLevel = this.objUser.UserLevel;
    // if (this.objUser.UserLevel > 1 && this.objUser.BANo) {
    //   this.userService.getUserByBANo(this.objUser.BANo).subscribe((response) => {
    //     if (response.StatusCode == ResponseStatus.success) {
    //       console.log(response.ResponseObj);
    //       this.objUser = response.ResponseObj;
    //       this.objUser.UserLevel = uLevel;
    //       this.objUser.UserID = "";
    //       this.objUser.Password = "";
    //       this.objUser.cpassword = "";
    //     } else {
    //       this.messageHelper.showMessage(ResponseStatus.fail, response.Message);
    //     }
    //   });
    // }
  }


  validateSingleInput(input) {
    if (input.type == "file") {
      var sFileName = input.value;
      if (sFileName.length > 0) {
        var blnValid = false;
        for (var j = 0; j < this._validFileExtensions.length; j++) {
          var sCurExtension = this._validFileExtensions[j];
          if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
            blnValid = true;
            break;
          }
        }
        //not valid extension of image
        if (!blnValid) {
          this.messageHelper.showMessage(1, "Sorry, " + sFileName + " is invalid, allowed extensions are: " + this._validFileExtensions.join(", "));
          input.value = "";
          return false;
        }
      }
    }
    //valid
    this.readFiles(input.files);
  }

  readFile(file, reader, callback) {
    // Set a callback funtion to fire after the file is fully loaded
    reader.onload = () => {
      // callback with the results
      callback(reader.result);
    }

    // Read the file
    reader.readAsDataURL(file);
  }

  readFiles(files, index = 0) {
    // Create the file reader
    let reader = new FileReader();

    // If there is a file
    if (index in files) {
      // Start reading this file
      this.readFile(files[index], reader, (result) => {
        // Create an img element and add the image file data to it
        var img = document.createElement("img");
        img.src = result;

        // Send this img to the resize function (and wait for callback)
        this.resize(img, 250, 50, (resized_jpeg, before, after) => {
          // For debugging (size in bytes before and after)
          this.debug_size_before.push(before);
          this.debug_size_after.push(after);

          // Add the resized jpeg img source to a list for preview
          // This is also the file you want to upload. (either as a
          // base64 string or img.src = resized_jpeg if you prefer a file).
          this.file_srcs = resized_jpeg;

          // Read the next file;
          this.readFiles(files, index + 1);
        });
      });
    } else {
      // When all files are done This forces a change detection
      this.changeDetectorRef.detectChanges();
    }
  }


  resize(img, MAX_WIDTH: number, MAX_HEIGHT: number, callback) {
    // This will wait until the img is loaded before calling this function
    return img.onload = () => {
      console.log("img loaded");
      // Get the images current width and height
      var width = img.width;
      var height = img.height;

      // Set the WxH to fit the Max values (but maintain proportions)
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      // create a canvas object
      var canvas = document.createElement("canvas");

      // Set the canvas to the new calculated dimensions
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0, width, height);


      // Get this encoded as a jpeg
      // IMPORTANT: 'jpeg' NOT 'jpg'
      var dataUrl = canvas.toDataURL('image/jpeg');

      this.objUser.Sign = dataUrl.split(',')[1];
      // $("#logo").show();

      // callback with the results
      callback(dataUrl, img.src.length, dataUrl.length);
    };
  }



}
