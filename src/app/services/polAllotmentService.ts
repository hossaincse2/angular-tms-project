import { Injectable } from "@angular/core";
import { HttpHelper } from "../common/helper/httpHelper";
import { Observable } from "rxjs";

@Injectable()
export class POLAllotmentService {
    constructor(private httpHelper: HttpHelper) {
    }

    savePOLAllotment(obj): Observable<any> {
        let url = "api/POLAllotment/savePOLAllotment";
        return this.httpHelper.postHelper(url, obj);
    }
    getAllPOLAllotment(): Observable<any> {
        let url = "api/POLAllotment/getAllPOLAllotment";
        return this.httpHelper.postHelper(url, {});
    }

    getFilteredPOLAllotment(obj): Observable<any> {
        let url = "api/POLAllotment/searchPOLAllotment";
        return this.httpHelper.postHelper(url, obj);
    }


    getPOLAllotmentByID(obj): Observable<any> {
        let url = "api/POLAllotment/getPOLAllotmentByID";
        return this.httpHelper.postHelper(url, obj);
    }

    deletePOLAllotment(obj): Observable<any> {
        let url = "api/POLAllotment/deletePOLAllotment";
        return this.httpHelper.postHelper(url, obj);
    }

    approvePOLAllotment(obj): Observable<any> {
        let url = "api/POLAllotment/approvePOLAllotment";
        return this.httpHelper.postHelper(url, obj);
    }
}