import { Component, OnInit } from '@angular/core';
import { Request } from "../../models/request";
import { RequestService } from '../../services/requestService';
import { ResponseStatus, RequestStatus, CANCEL_REASON, RequestType } from '../../common/QSEnums';
import { MessageHelper } from '../../common/helper/messageHelper';
import { QueryObject } from '../../models/queryObject';
import { LocalStorageService } from 'angular-web-storage';

declare var $: any;

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css'],
  providers: [RequestService],
})

export class RequestListComponent implements OnInit {
  showRequestForm: boolean = true;
  public queryObject: QueryObject = new QueryObject();
  public lstRequest: Request[] = new Array<Request>();
  public objRequest: Request = new Request();
  public userLevel: number = 0;
  public lstRequestStatus: any[];
  public lstCancelReason: any[];
  public cancelResonID: number;


  constructor(private messageHelper: MessageHelper, private requestService: RequestService
    , private localStorageService: LocalStorageService) { }

  ngOnInit() {
   
    this.showRequestForm = true;
    this.lstRequestStatus = RequestStatus;
    this.userLevel = this.localStorageService.get("userLevel");
    this.lstCancelReason = CANCEL_REASON;
    this.queryObject.FromDate = new Date();
    this.queryObject.ToDate = new Date();
    this.searchByDate();
    this.generatePrint();
  }

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


  generateBarcode(value: string) {
    $(document).ready(function () {

      var btype = 'code39';
      var renderer = 'css';

      var settings = {
        output: renderer,
        bgColor: '#FFFFFF',
        color: '#000000',
        barWidth: '1',
        barHeight: '30',
        moduleSize: '10',
        showHRI: false,
        posX: '0',
        posY: '0',
        addQuietZone: '1'
      };

      $("#barcodeTarget").html("").show().barcode(value, btype, settings);
    });
  }

  searchByBANo() {
    this.requestService.getFilteredRequest(this.queryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstRequest = response.ResponseObj;
        this.lstRequest.forEach(request => {

          var requestType = RequestType.filter(r => r.id == request.RequestType)[0];
          if (requestType) {
            request.RequestTypeName = requestType.name;
          }

          var status = this.lstRequestStatus.filter(s => s.id == request.Status)[0];
          if (status != null) {
            request.StatusName = status.name;
          }
          var cancelReason = this.lstCancelReason.filter(s => s.id == request.CancelReason)[0];
          if (cancelReason) {
            if (cancelReason.id = CANCEL_REASON[4].id) {
              request.OtherCancelReason = cancelReason.name;
            }
          }
        })
      }
    });
  }

  searchByDate() {
    this.requestService.getFilteredRequest(this.queryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstRequest = response.ResponseObj;
        this.lstRequest.forEach(request => {

          var requestType = RequestType.filter(r => r.id == request.RequestType)[0];
          if (requestType) {
            request.RequestTypeName = requestType.name;
          }

          var status = this.lstRequestStatus.filter(s => s.id == request.Status)[0];
          if (status != null) {
            request.StatusName = status.name;
          }

          var cancelReason = this.lstCancelReason.filter(s => s.id == request.CancelReason)[0];
          if (cancelReason) {
            if (cancelReason.id = CANCEL_REASON[4].id) {
              request.OtherCancelReason = cancelReason.name;
            }
          }

        })
      }
    });
  }

  public getAllRequest() {
    this.requestService.getAllRequest().subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstRequest = response.ResponseObj;

        console.log(this.lstRequest);
        this.lstRequest.forEach(request => {

          var requestType = RequestType.filter(r => r.id == request.RequestType)[0];
          if (requestType) {
            request.RequestTypeName = requestType.name;
          }

          var status = this.lstRequestStatus.filter(s => s.id == request.Status)[0];
          var cancelReason = this.lstCancelReason.filter(s => s.id == request.CancelReason)[0];
          if (cancelReason) {
            if (cancelReason.id = CANCEL_REASON[4].id) {
              request.OtherCancelReason = cancelReason.name;
            }
          }

          if (status != null) {
            request.StatusName = status.name;
          }
        })
      }
    });
  }

  public rejectModalCall(request) {
    this.objRequest = request;
    $('#myModalReject').modal('show');
  }

  public rejectRequest() {
    if (confirm("Are you sure to reject this request?")) {

      console.log(this.objRequest);

      this.requestService.rejectRequest(this.objRequest).subscribe((response) => {
        if (response.StatusCode == ResponseStatus.success) {
          this.messageHelper.showMessage(ResponseStatus.success, "Rejected successfully");
          this.getAllRequest();
        } else {
          this.messageHelper.showMessage(ResponseStatus.fail, "Failed to reject request");
        }
      });
    }
  }

  public editRequest(request) {

    console.log(request);
    this.objRequest = request;
    this.showRequestForm = true;
    $('#editRequestModal').modal('show');

  }

  public ApproveRequest(request) {
    if (confirm("Are you sure to approve this request?")) {
      this.requestService.approveRequest(request.RequestID).subscribe((response) => {
        if (response.StatusCode == ResponseStatus.success) {
          this.messageHelper.showMessage(ResponseStatus.success, "Approved successfully");
          this.getAllRequest();
        } else {
          this.messageHelper.showMessage(ResponseStatus.fail, "Failed to approve request");
        }
      });
    }
  }


  public printIndent(request) {
    $('#printRequestModal').modal('show');
    this.requestService.downloadRequest(request.RequestID).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.objRequest = response.ResponseObj;
        this.generateBarcode(this.objRequest.SonbucktokNo);
      }
    });
  }

  generatePrint() {
    $('.printMe').click(function () {
      $("#printRequestModal").print({
        globalStyles: true,
        mediaPrint: true,
        stylesheet: null,
        noPrintSelector: ".noprint",
        iframe: true,
        append: null,
        prepend: null,
        manuallyCopyFormValues: true,
        deferred: $.Deferred(),
        timeout: 750,
        title: null,
        doctype: '<!doctype html>'
      });
      this.generateBarcode(this.objRequest.SonbucktokNo);
    });
  }


}
