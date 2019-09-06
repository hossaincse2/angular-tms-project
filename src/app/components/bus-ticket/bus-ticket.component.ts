import { Component, OnInit } from '@angular/core';
import { BusTicketService } from '../../services/busTicketService';
import { BusTicket } from '../../models/busTicket';
import { BusTicketDetail } from '../../models/busTicketDetail';
import { VMBusTicket } from '../../models/vmBusTicket';
import { ResponseStatus } from '../../common/QSEnums';
import { MessageHelper } from '../../common/helper/messageHelper';

@Component({
  selector: 'app-bus-ticket',
  templateUrl: './bus-ticket.component.html',
  styleUrls: ['./bus-ticket.component.css'],
  providers: [BusTicketService]
})
export class BusTicketComponent implements OnInit {

  objBusTicket: BusTicket = new BusTicket();
  objBusTicketDetail: BusTicketDetail = new BusTicketDetail();
  objVMBusTicket: VMBusTicket = new VMBusTicket();

  constructor(private bustTicketService: BusTicketService,
    private messageHelper: MessageHelper) { }

  ngOnInit() {
    this.objBusTicket.RequestDate = new Date();
    this.objBusTicket.TravelDate = new Date();
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

}
