import { Injectable } from "@angular/core";
import { HttpHelper } from "../common/helper/httpHelper";
import { Observable } from "rxjs";

@Injectable()
export class POLDemandService {
    constructor(private httpHelper: HttpHelper) {
    }

    saveUnitDemand(obj): Observable<any> {
        let url = "api/POLDemand/savePOLDemand";
        return this.httpHelper.postHelper(url, obj);
    }
    getAllPOLDemand(): Observable<any> {
        let url = "api/POLDemand/getAllPOLDemand";
        return this.httpHelper.postHelper(url, {});
    }

    getFilteredPOLDemand(obj): Observable<any> {
        let url = "api/POLDemand/searchPOLDemand";
        return this.httpHelper.postHelper(url, obj);
    }


    deletePOLDemand(obj): Observable<any> {
        let url = "api/POLDemand/deletePOLDemand";
        return this.httpHelper.postHelper(url, obj);
    }

    approvePOLDemand(obj): Observable<any> {
        let url = "api/POLDemand/approvePOLDemand";
        return this.httpHelper.postHelper(url, obj);
    }

    
    getDistributionInfoByUnitID(obj): Observable<any> {
        let url = "api/POLDemand/getDistributionInfoByUnitID";
        return this.httpHelper.postHelper(url, obj);
    }
}