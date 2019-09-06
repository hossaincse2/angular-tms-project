import { Injectable } from "@angular/core";
import { HttpHelper } from "../common/helper/httpHelper";
import { Observable } from "rxjs";

@Injectable()
export class HygineAndChemicalDemandService {
    constructor(private httpHelper: HttpHelper) {
    }

    saveHygineAndChemicalDemand(obj): Observable<any> {
        let url = "api/HygineAndChemicalDemand/saveHygineAndChemicalDemand";
        return this.httpHelper.postHelper(url, obj);
    }
    getAllUnitDemand(): Observable<any> {
        let url = "api/HygineAndChemicalDemand/getAllHygineAndChemicalDemand";
        return this.httpHelper.postHelper(url, {});
    }

    getFilteredHygineAndChemicalDemand(obj): Observable<any> {
        let url = "api/HygineAndChemicalDemand/searchHygineAndChemicalDemand";
        return this.httpHelper.postHelper(url, obj);
    }
    saveHygineAndChemicalDistribution(obj): Observable<any> {
        let url = "api/HygineAndChemicalDemand/saveHygineAndChemicalDistribution";
        return this.httpHelper.postHelper(url, obj);
    }

    approveHygineAndChemicalDemand(obj): Observable<any> {
        let url = "api/HygineAndChemicalDemand/approveHygineAndChemicalDemand";
        return this.httpHelper.postHelper(url, obj);
    }


}