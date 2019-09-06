import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../common/helper/httpHelper';

@Injectable()
export class ItemTypeService {
    constructor(private httpHelper: HttpHelper) {
    }

    saveItemType(obj): Observable<any> {
        let url = "api/ItemType/saveItemType";
        return this.httpHelper.postHelper(url, obj);
    }
    getAllItemType(): Observable<any> {
        let url = "api/ItemType/getAllItemType";
        return this.httpHelper.postHelper(url, {});
    }

    getFilteredItemType(obj): Observable<any> {
        let url = "api/ItemType/searchItemType";
        return this.httpHelper.postHelper(url, obj);
    }
    
}