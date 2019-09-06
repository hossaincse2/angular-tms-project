
import { Injectable } from "@angular/core";
import { HttpHelper } from "../common/helper/httpHelper";
import { Observable } from "rxjs";

@Injectable()
export class GatePassService {
    constructor(private httpHelper: HttpHelper) {
    }

    saveGatePass(obj): Observable<any> {
        let url = "api/GatePass/saveGatePass";
        return this.httpHelper.postHelper(url, obj);
    }
    getAllGatePass(): Observable<any> {
        let url = "api/GatePass/getAllGatePass";
        return this.httpHelper.postHelper(url, {});
    }

    getFilteredGatePass(obj): Observable<any> {
        let url = "api/GatePass/searchGatePass";
        return this.httpHelper.postHelper(url, obj);
    }

    getGatePassByNumber(obj): Observable<any> {
        let url = "api/GatePass/getGatePassByNumber";
        return this.httpHelper.postHelper(url, obj);
    }

    checkInGate(obj): Observable<any> {
        let url = "api/GatePass/checkInGate";
        return this.httpHelper.postHelper(url, obj);
    }

}