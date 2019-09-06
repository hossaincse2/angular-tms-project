import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../common/helper/httpHelper';

@Injectable()
export class UnitOfMeasureService {
    constructor(private httpHelper: HttpHelper) {
    }

    saveUnitOfMeasure(obj): Observable<any> {
        let url = "api/UnitOfMeasure/saveUnitOfMeasure";
        return this.httpHelper.postHelper(url, obj);
    }
    getAllUnitOfMeasure(): Observable<any> {
        let url = "api/UnitOfMeasure/getAllUnitOfMeasure";
        return this.httpHelper.postHelper(url, {});
    }

    getFilteredUnitOfMeasure(obj): Observable<any> {
        let url = "api/UnitOfMeasure/searchUnitOfMeasure";
        return this.httpHelper.postHelper(url, obj);
    }
    
}