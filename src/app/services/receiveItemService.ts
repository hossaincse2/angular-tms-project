import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../common/helper/httpHelper';

@Injectable()
export class ReceiveItemService {
    constructor(private httpHelper: HttpHelper) {
    }

    saveReceiveItem(obj): Observable<any> {
        let url = "api/ReceiveItem/saveReceiveItem";
        return this.httpHelper.postHelper(url, obj);
    }
    
    getAllReceiveItem(): Observable<any> {
        let url = "api/ReceiveItem/getAllReceiveItem";
        return this.httpHelper.postHelper(url, {});
    }

    getFilteredReceiveItem(obj): Observable<any> {
        let url = "api/ReceiveItem/SearchReceiveItem";
        return this.httpHelper.postHelper(url, obj);
    }
    
    
}