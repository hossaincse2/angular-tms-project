import { Injectable } from "@angular/core";
import { HttpHelper } from "../common/helper/httpHelper";
import { Observable } from "rxjs";

@Injectable()
export class HospitalDemandService {
    constructor(private httpHelper: HttpHelper) {
    }

    saveUnitDemand(obj): Observable<any> {
        let url = "api/HospitalDemand/saveHospitalDemand";
        return this.httpHelper.postHelper(url, obj);
    }
    getAllUnitDemand(): Observable<any> {
        let url = "api/HospitalDemand/getAllHospitalDemand";
        return this.httpHelper.postHelper(url, {});
    }

    getFilteredUnitDemand(obj): Observable<any> {
        let url = "api/HospitalDemand/searchHospitalDemand";
        return this.httpHelper.postHelper(url, obj);
    }

    approveHospitalDemand(obj): Observable<any> {
        let url = "api/HospitalDemand/approveHospitalDemand";
        return this.httpHelper.postHelper(url, obj);
    }

    getFilteredHospitalDemandFroDistribution(obj): Observable<any> {
        let url = "api/HospitalDemand/getFilteredHospitalDemandFroDistribution";
        return this.httpHelper.postHelper(url, obj);
    }

}