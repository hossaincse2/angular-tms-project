import { HttpHelper } from "../common/helper/httpHelper";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class BusTicketService {

    constructor(private httpHelper: HttpHelper) {
    }

    saveBusTicket(obj): Observable<any> {
        let url = "api/BusTicket/saveBusTicket";
        return this.httpHelper.postHelper(url, obj);
    }
    getAllBusTicket(): Observable<any> {
        let url = "api/BusTicket/getAllBusTicket";
        return this.httpHelper.postHelper(url, {});
    }

    getFilteredBusTicket(obj): Observable<any> {
        let url = "api/BusTicket/getFilteredBusTicket";
        return this.httpHelper.postHelper(url, obj);
    }

    approveBusTicket(obj): Observable<any> {
        let url = "api/BusTicket/approveTicket";
        return this.httpHelper.postHelper(url, obj);
    }

    rejectBusTicket(obj): Observable<any> {
        let url = "api/BusTicket/rejectTicket";
        return this.httpHelper.postHelper(url, obj);
    }
}