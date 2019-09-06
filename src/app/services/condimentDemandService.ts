import { Injectable } from "@angular/core";
import { HttpHelper } from "../common/helper/httpHelper";
import { Observable } from "rxjs";

@Injectable()
export class CondimentDemandService {
    constructor(private httpHelper: HttpHelper) {
    }

    saveCondimentDemand(obj): Observable<any> {
        let url = "api/CondimentDemand/saveCondimentDemand";
        return this.httpHelper.postHelper(url, obj);
    }

    saveCondimentDistribution(obj): Observable<any> {
        let url = "api/CondimentDemand/saveCondimentDistribution";
        return this.httpHelper.postHelper(url, obj);
    }

    getAllCondimentDemand(): Observable<any> {
        let url = "api/CondimentDemand/getAllCondimentDemand";
        return this.httpHelper.postHelper(url, {});
    }

    getFilteredCondimentDemand(obj): Observable<any> {
        let url = "api/CondimentDemand/searchCondimentDemand";
        return this.httpHelper.postHelper(url, obj);
    }


    approveCondimentDemand(obj): Observable<any> {
        let url = "api/CondimentDemand/approveCondimentDemand";
        return this.httpHelper.postHelper(url, obj);
    }

    getFilteredCondimentDemandFroDistribution(obj): Observable<any> {
        let url = "api/CondimentDemand/getFilteredCondimentDemandFroDistribution";
        return this.httpHelper.postHelper(url, obj);
    }
}