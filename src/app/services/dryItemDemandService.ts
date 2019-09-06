import { Injectable } from "@angular/core";
import { HttpHelper } from "../common/helper/httpHelper";
import { Observable } from "rxjs";

@Injectable()
export class DryItemDemandService {
    constructor(private httpHelper: HttpHelper) {
    }

    saveDryItemDemand(obj): Observable<any> {
        let url = "api/DryItemDemand/saveDryItemDemand";
        return this.httpHelper.postHelper(url, obj);
    }
    getAllDryItemDemand(): Observable<any> {
        let url = "api/DryItemDemand/getAllDryItemDemand";
        return this.httpHelper.postHelper(url, {});
    }

    getFilteredDryItemDemand(obj): Observable<any> {
        let url = "api/DryItemDemand/searchDryItemDemand";
        return this.httpHelper.postHelper(url, obj);
    }

    getDryDemandSummary(obj): Observable<any> {
        let url = "api/DryItemDemand/getAllUnitDemadSummary";
        return this.httpHelper.postHelper(url, obj);
    }

    saveDryItemDistribution(obj): Observable<any> {
        let url = "api/DryItemDemand/SaveDryItemDistribution";
        return this.httpHelper.postHelper(url, obj);
    }

    approveDryItemDemand(obj): Observable<any> {
        let url = "api/DryItemDemand/approveDryItemDemand";
        return this.httpHelper.postHelper(url, obj);
    }
    printDemand(obj): Observable<any> {
        console.log("Test Log");
        let url = "api/DryItemDemand/printDemand";
        //let url = "api/DryItemDemand/testReport";
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('responseType', 'arrayBuffer');

        return this.httpHelper.postHelper(url, obj);
    }



    getFilteredDryItemDemandFroDistribution(obj): Observable<any> {
        let url = "api/DryItemDemand/getFilteredDryItemDemandFroDistribution";
        return this.httpHelper.postHelper(url, obj);
    }

    getFilteredDryItemDemandFroGatePass(obj): Observable<any> {
        let url = "api/DryItemDemand/getFilteredDryItemDemandFroGatePass";
        return this.httpHelper.postHelper(url, obj);
    }

    getStockReport(obj): Observable<any> {
        let url = "api/DryItemDemand/GetStockReport";
        return this.httpHelper.postHelper(url, obj);
    }


}