import { Injectable } from "@angular/core";
import { HttpHelper } from "../common/helper/httpHelper";
import { Observable } from "rxjs";

@Injectable()
export class ButcheryDemandService {
    constructor(private httpHelper: HttpHelper) {
    }

    saveUnitDemand(obj): Observable<any> {
        let url = "api/ButcheryDemand/saveButcheryDemand";
        return this.httpHelper.postHelper(url, obj);
    }

    deleteButcheryDemand(obj): Observable<any> {
        let url = "api/ButcheryDemand/DeleteButcheryDemand";
        return this.httpHelper.postHelper(url, obj);
    }


    distributeUnitDemand(obj): Observable<any> {
        let url = "api/ButcheryDemand/distributeUnitDemand";
        return this.httpHelper.postHelper(url, obj);
    }

    getAllUnitDemand(): Observable<any> {
        let url = "api/ButcheryDemand/getAllButcheryDemand";
        return this.httpHelper.postHelper(url, {});
    }

    getFilteredUnitDemand(obj): Observable<any> {
        let url = "api/ButcheryDemand/searchButcheryDemand";
        return this.httpHelper.postHelper(url, obj);
    }

    getAllUnitDemadSummary(obj): Observable<any> {
        let url = "api/ButcheryDemand/getAllUnitDemadSummary";
        return this.httpHelper.postHelper(url, obj);
    }  
    
    getVMButcheryDemand(obj): Observable<any> {
        let url = "api/ButcheryDemand/getVMButcheryDemand";
        return this.httpHelper.postHelper(url, obj);
    }
}