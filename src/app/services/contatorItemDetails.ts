import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../common/helper/httpHelper';

@Injectable()
export class ContactorItemDetailService {
    constructor(private httpHelper: HttpHelper) {
    }

    saveContactorItemDetails(obj): Observable<any> {
        let url = "api/ContactorItemDetails/saveUnit";
        return this.httpHelper.postHelper(url, obj);
    }
    getAllContactorItemDetails(): Observable<any> {
        let url = "api/ContactorItemDetails/getAllUnit";
        return this.httpHelper.postHelper(url, {});
    }

    getFilteredContactorItemDetails(obj): Observable<any> {
        let url = "api/ContactorItemDetails/searchUnit";
        return this.httpHelper.postHelper(url, obj);
    }
    
}