import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../common/helper/httpHelper';

@Injectable()
export class ItemService {
    constructor(private httpHelper: HttpHelper) {
    }

    saveItem(obj): Observable<any> {
        let url = "api/Item/saveItem";
        return this.httpHelper.postHelper(url, obj);
    }

    deleteItem(obj): Observable<any> {
        let url = "api/Item/deleteItem";
        return this.httpHelper.postHelper(url, obj);
    }
    getAllItem(): Observable<any> {
        let url = "api/Item/getAllItem";
        return this.httpHelper.postHelper(url, {});
    }

    getFilteredItem(obj): Observable<any> {
        let url = "api/Item/searchItem";
        return this.httpHelper.postHelper(url, obj);
    }

    getItemByItemTypeID(obj): Observable<any> {
        
        let url = "api/Item/searchItemByItemTypeID";
        return this.httpHelper.postHelper(url, obj);
    }  
    
}