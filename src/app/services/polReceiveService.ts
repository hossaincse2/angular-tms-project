import { Injectable } from "@angular/core";
import { HttpHelper } from "../common/helper/httpHelper";
import { Observable } from "rxjs";

@Injectable()
export class POLReceiveService {

    constructor(private httpHelper: HttpHelper) {
    }

    savePOLReceive(obj): Observable<any> {
        let url = "api/POLReceive/savePOLReceive";
        return this.httpHelper.postHelper(url, obj);
    }
    getAllPOLReceive(): Observable<any> {
        let url = "api/POLReceive/getAllPOLReceive";
        return this.httpHelper.postHelper(url, {});
    }

    getFilteredPOLReceive(obj): Observable<any> {
        let url = "api/POLReceive/searchPOLReceive";
        return this.httpHelper.postHelper(url, obj);
    }


    deletePOLReceive(obj): Observable<any> {
        let url = "api/POLReceive/deletePOLReceive";
        return this.httpHelper.postHelper(url, obj);
    }

    approvePOLReceive(obj): Observable<any> {
        let url = "api/POLReceive/approvePOLReceive";
        return this.httpHelper.postHelper(url, obj);
    }
    getPOLReceiveByID(obj): Observable<any> {
        let url = "api/POLReceive/GetVMPOLReceiveByID";
        return this.httpHelper.postHelper(url, obj);
    }
}