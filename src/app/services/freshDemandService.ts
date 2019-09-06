import { Injectable } from "@angular/core";
import { HttpHelper } from "../common/helper/httpHelper";
import { Observable } from "rxjs";

@Injectable()
export class FreshDemandService {
    constructor(private httpHelper: HttpHelper) {
    }

    saveUnitDemand(obj): Observable<any> {
        let url = "api/FreshDemand/saveFreshDemand";
        return this.httpHelper.postHelper(url, obj);
    }

    deleteFreshDemand(obj): Observable<any> {
        let url = "api/FreshDemand/DeleteFreshDemand";
        return this.httpHelper.postHelper(url, obj);
    }

    getAllUnitDemand(): Observable<any> {
        let url = "api/FreshDemand/getAllFreshDemand";
        return this.httpHelper.postHelper(url, {});
    }

    getFilteredUnitDemand(obj): Observable<any> {
        let url = "api/FreshDemand/searchFreshDemand";
        return this.httpHelper.postHelper(url, obj);
    }

    getAllUnitDemadSummary(obj): Observable<any> {
        let url = "api/FreshDemand/getAllUnitDemadSummary";
        return this.httpHelper.postHelper(url, obj);
    }
     getVMFreshDemand(obj): Observable<any> {
        let url = "api/FreshDemand/getVMFreshDemand";
        return this.httpHelper.postHelper(url, obj);
    }

    getFilteredDemandByID(obj): Observable<any> {
        let url = "api/FreshDemand/getFilteredDemandByID";
        return this.httpHelper.postHelper(url, obj);
    }


    distributeUnitDemand(obj): Observable<any> {
        let url = "api/FreshDemand/distributeUnitDemand";
        return this.httpHelper.postHelper(url, obj);
    }
}