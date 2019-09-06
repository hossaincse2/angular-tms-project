import { Component, OnInit } from '@angular/core';
import { VMBusTicket } from '../../models/vmBusTicket';
import { BusTicketService } from '../../services/busTicketService';
import { MessageHelper } from '../../common/helper/messageHelper';
import { QueryObject } from '../../models/queryObject';
import { ResponseStatus, TicketStatus, BusTicketRejectReason, BUSTYPE, CANCEL_REASON } from '../../common/QSEnums';
import { BusTicket } from '../../models/busTicket';
import { BusTicketDetail } from '../../models/busTicketDetail';
import { LocalStorageService } from 'angular-web-storage';
declare var $: any;

@Component({
  selector: 'app-bus-ticket-request',
  templateUrl: './bus-ticket-request.component.html',
  styleUrls: ['./bus-ticket-request.component.css'],
  providers: [BusTicketService]
})
export class BusTicketRequestComponent implements OnInit {
  lstVMBusTicket: VMBusTicket[] = new Array<VMBusTicket>()
  objVMBusTicket: VMBusTicket = new VMBusTicket();
  objBusTicket: BusTicket = new BusTicket();
  objBusTicketDetail: BusTicketDetail = new BusTicketDetail();
  public objQueryObject: QueryObject = new QueryObject();


  public ticketNumber: string;
  userLevel: number;
  public rejectReason: string;
  public rejectReasonID: number;
  public totalTicket: number = 0;

  constructor(private bustTicketService: BusTicketService,
    private messageHelper: MessageHelper, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.objQueryObject.FromDate = new Date();
    this.objQueryObject.ToDate = new Date();
    this.getFilteredBusTicket();
    this.generatePrint();
    this.userLevel = this.localStorageService.get("userLevel");
  }

  generatePrint() {
    $('.printMe').click(function () {
      $("#Busticket").print({
        globalStyles: true,
        mediaPrint: false,
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

    });
  }

  printSummary() {

    alert("hi");

    $('.pSummary').click(function () {
      $("#tblTickets").print({
        globalStyles: true,
        mediaPrint: false,
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
        barHeight: '50',
        moduleSize: '10',
        showHRI: false,
        posX: '0',
        posY: '0',
        addQuietZone: '1'
      };

      $("#barcodeTarget").html("").show().barcode(value, btype, settings);
    });
  }

  getFilteredBusTicket() {
    this.bustTicketService.getFilteredBusTicket(this.objQueryObject).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.lstVMBusTicket = response.ResponseObj;




        this.lstVMBusTicket.forEach(vmTicket => {

          var array = vmTicket.busTicket.ApprovedTicketNumber.split(",");
          this.totalTicket += array.length;

          var busyType = BUSTYPE.filter(b => b.id == vmTicket.busTicket.BusType)[0];
          if (busyType) {
            vmTicket.busTicket.BusTypeName = busyType.name;
          }
          var status = TicketStatus.filter(t => t.id == vmTicket.busTicket.Status)[0];
          if (status) {
            vmTicket.busTicket.StatusName = status.name;
            if (vmTicket.busTicket.Status == 3) {
              var rejectReason = BusTicketRejectReason.filter(r => r.id = vmTicket.busTicket.RejectReasonID)[0];
              if (rejectReason) {
                if (rejectReason.id == 2) {
                  vmTicket.busTicket.ApprovedTicketNumber = rejectReason.name + vmTicket.busTicket.RejectReason;
                }
                else {
                  vmTicket.busTicket.ApprovedTicketNumber = rejectReason.name;
                }
              }
            }
          }
        })
      }
    });
  }



  editRequest(vmBusTicket) {
    this.objBusTicket = vmBusTicket.busTicket;
    this.objBusTicketDetail = vmBusTicket.busTicketDetail;
    // console.log(this.objBusTicketDetail);
    $('#myModalEdit').modal("show");
  }

  showForApproval(vmBusTicket) {
    this.objBusTicket = vmBusTicket.busTicket;
    this.objBusTicketDetail = vmBusTicket.busTicketDetail;
    $('#myModalApprove').modal("show");

  }

  showForReject(vmBusTicket) {
    this.objBusTicket = vmBusTicket.busTicket;
    this.objBusTicketDetail = vmBusTicket.busTicketDetail;
    $('#myModalReject').modal("show");
  }

  printTicket(vmBusTicket) {
    this.objBusTicket = vmBusTicket.busTicket;
    this.objBusTicketDetail = vmBusTicket.busTicketDetail;

    var busType = BUSTYPE.filter(b => b.id == this.objBusTicket.BusType)[0];
    if (busType) {
      this.objBusTicket.BusTypeName = busType.name;
    }

    $('#myModalPrint').modal("show");
  }


  saveBusTicket() {
    this.objVMBusTicket.busTicket = this.objBusTicket;
    this.objVMBusTicket.busTicketDetail = this.objBusTicketDetail;
    this.bustTicketService.saveBusTicket(this.objVMBusTicket).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Successfully Saved");
        this.objVMBusTicket = new VMBusTicket();
        this.objBusTicket = new BusTicket();
        this.objBusTicketDetail = new BusTicketDetail();
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to save");
      }
    });
  }



  approveRequest() {
    this.objVMBusTicket.busTicket = this.objBusTicket;
    this.objVMBusTicket.busTicketDetail = this.objBusTicketDetail;
    this.bustTicketService.approveBusTicket(this.objVMBusTicket).subscribe((response) => {
      if (response.StatusCode == ResponseStatus.success) {
        this.messageHelper.showMessage(ResponseStatus.success, "Approved Successfully");
      } else {
        this.messageHelper.showMessage(ResponseStatus.fail, "Failed to approved ticket");
      }

    });
  }

  rejectRequest() {
    this.objVMBusTicket.busTicket = this.objBusTicket;
    this.objVMBusTicket.busTicketDetail = this.objBusTicketDetail;
    if (confirm("Are you sure to reject this request?")) {
      this.bustTicketService.rejectBusTicket(this.objVMBusTicket).subscribe((response) => {
        if (response.StatusCode == ResponseStatus.success) {
          this.messageHelper.showMessage(ResponseStatus.success, "Rejected Successfully");
        }
        else {
          this.messageHelper.showMessage(ResponseStatus.fail, "Failed to reject ticket");
        }
      });
    }
  }


}
