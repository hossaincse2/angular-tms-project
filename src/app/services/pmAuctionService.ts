import { Injectable } from "@angular/core";
import { HttpHelper } from "../common/helper/httpHelper";
import { Observable } from "rxjs";

@Injectable()
export class PMAuctionService {
    constructor(private httpHelper: HttpHelper) {
    }

    savePMAuction(obj): Observable<any> {
        let url = "api/PMAuction/savePMAuction";
        return this.httpHelper.postHelper(url, obj);
    }
    getAllPMAuction(): Observable<any> {
        let url = "api/PMAuction/getAllPMAuction";
        return this.httpHelper.postHelper(url, {});
    }

    getFilteredPMAuction(obj): Observable<any> {
        let url = "api/PMAuction/searchPMAuction";
        return this.httpHelper.postHelper(url, obj);
    }


    deletePMAuction(obj): Observable<any> {
        let url = "api/PMAuction/deletePMAuction";
        return this.httpHelper.postHelper(url, obj);
    }

    approvePMAuction(obj): Observable<any> {
        let url = "api/PMAuction/approvePMAuction";
        return this.httpHelper.postHelper(url, obj);
    }
}