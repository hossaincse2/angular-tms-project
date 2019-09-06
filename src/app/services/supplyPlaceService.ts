import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../common/helper/httpHelper';

@Injectable()
export class SupplyPlaceService {
    constructor(private httpHelper: HttpHelper) {
    }

    saveSupplyPlace(obj): Observable<any> {
        let url = "api/SupplyPlace/saveSupplyPlace";
        return this.httpHelper.postHelper(url, obj);
    }
    getAllSupplyPlace(): Observable<any> {
        let url = "api/SupplyPlace/getAllSupplyPlace";
        return this.httpHelper.postHelper(url, {});
    }

    getFilteredSupplyPlace(obj): Observable<any> {
        let url = "api/SupplyPlace/searchSupplyPlace";
        return this.httpHelper.postHelper(url, obj);
    }

    deleteSupplyPlace(obj): Observable<any> {
        let url = "api/SupplyPlace/deleteSupplyPlace";
        return this.httpHelper.postHelper(url, obj);
    }
}