import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../common/helper/httpHelper';

@Injectable()
export class RRPService {
    constructor(private httpHelper: HttpHelper) {
    }

    saveRRPeople(obj): Observable<any> {
        let url = "api/RRPeople/saveRRPeople";
        return this.httpHelper.postHelper(url, obj);
    }
    getAllRRPeople(): Observable<any> {
        let url = "api/RRPeople/getAllRRPeople";
        return this.httpHelper.postHelper(url, {});
    }

    getFilteredExistingRRPeople(obj): Observable<any> {
        let url = "api/RRPeople/searchExistingRRPeople";
        return this.httpHelper.postHelper(url, obj);
    }
    getFilteredRRPeople(obj): Observable<any> {
        let url = "api/RRPeople/searchRRPeople";
        return this.httpHelper.postHelper(url, obj);
    }
    printRRPeople(obj): Observable<any> {
        let url = "api/RRPeople/printRRPeople";
        return this.httpHelper.postHelper(url, obj);
    }
    
}