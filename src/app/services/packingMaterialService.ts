
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../common/helper/httpHelper';

@Injectable()
export class PackingMaterialService {
    constructor(private httpHelper: HttpHelper) {
    }

    savePackingMaterial(obj): Observable<any> {
        let url = "api/PackingMaterial/savePackingMaterial";
        return this.httpHelper.postHelper(url, obj);
    }
    getAllPackingMaterial(): Observable<any> {
        let url = "api/PackingMaterial/getAllPackingMaterial";
        return this.httpHelper.postHelper(url, {});
    }

    getFilteredPackingMaterial(obj): Observable<any> {
        let url = "api/PackingMaterial/searchPackingMaterial";
        return this.httpHelper.postHelper(url, obj);
    }

    deletePackingMaterial(obj): Observable<any> {
        let url = "api/PackingMaterial/deletePackingMaterial";
        return this.httpHelper.postHelper(url, obj);
    }
    
}