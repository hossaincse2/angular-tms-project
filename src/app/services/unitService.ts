import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../common/helper/httpHelper';

@Injectable()
export class UnitService {
    constructor(private httpHelper: HttpHelper) {
    }

    saveUnit(obj): Observable<any> {
        let url = "api/Unit/saveUnit";
        return this.httpHelper.postHelper(url, obj);
    }

    deleteUnit(obj): Observable<any> {
        let url = "api/Unit/deleteUnit";
        return this.httpHelper.postHelper(url, obj);
    }
    getAllUnit(): Observable<any> {
        let url = "api/Unit/getAllUnit";
        return this.httpHelper.postHelper(url, {});
    }

    getAllUnitForRegistration(): Observable<any> {
        let url = "api/Unit/getAllUnitForResigration";
        return this.httpHelper.postHelper(url, {});
    }
    getFilteredUnit(obj): Observable<any> {
        let url = "api/Unit/searchUnit";
        return this.httpHelper.postHelper(url, obj);
    }
    
}