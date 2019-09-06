import { Injectable } from "@angular/core";
import { HttpHelper } from "../common/helper/httpHelper";
import { Observable } from "rxjs";

@Injectable()
export class PMReceiveService {
    constructor(private httpHelper: HttpHelper) {
    }

    savePMReceive(obj): Observable<any> {
        let url = "api/PMReceive/savePMReceive";
        return this.httpHelper.postHelper(url, obj);
    }
    getAllPMReceive(): Observable<any> {
        let url = "api/PMReceive/getAllPMReceive";
        return this.httpHelper.postHelper(url, {});
    }

    getFilteredPMReceive(obj): Observable<any> {
        let url = "api/PMReceive/searchPMReceive";
        return this.httpHelper.postHelper(url, obj);
    }

    getAllPMReceivable(obj): Observable<any> {
        let url = "api/PMReceive/getAllPMReceivable";
        return this.httpHelper.postHelper(url, obj);
    }
    getPMStock(): Observable<any> {
        let url = "api/PMReceive/getPMStock";
        return this.httpHelper.postHelper(url, {});
    }
    deletePMReceive(obj): Observable<any> {
        let url = "api/PMReceive/deletePMReceive";
        return this.httpHelper.postHelper(url, obj);
    }

    approvePMReceive(obj): Observable<any> {
        let url = "api/PMReceive/approvePMReceive";
        return this.httpHelper.postHelper(url, obj);
    }
}