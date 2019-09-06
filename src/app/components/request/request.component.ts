import { Component, OnInit } from '@angular/core';
import { Request } from "../../models/request";
import { RequestService } from '../../services/requestService';
import { ResponseStatus } from '../../common/QSEnums';
import { MessageHelper } from '../../common/helper/messageHelper';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
  providers: [RequestService]
})
export class RequestComponent implements OnInit {
  showRequestForm: boolean = false;
  numberofVehicle: number = 0;
  vehicleType: number = 0;
  otherDisable: boolean = false;
  public objRequest: Request = new Request();
  constructor(private messageHelper: MessageHelper, private requestService: RequestService,
    private localStorageService: LocalStorageService) { }


  saveRequest() {
    this.requestService.saveRequest(this.objRequest).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
        this.objRequest = new Request();
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }



  ngOnInit() {
    this.showRequestForm = false;
    this.objRequest.VehicleNumber = 1;
    if (this.localStorageService.get("userLevel") == 1) {
      this.otherDisable = true;
      this.objRequest.VehicleType = 1;
    }
  }

  banckRequest() {
    this.showRequestForm = false;
  }

  showRequest(requestType) {

    this.showRequestForm = true;
    if (requestType == 2) {
      this.objRequest.VehicleType = 1;
      this.objRequest.RequestType = requestType;
    }
  }

}
