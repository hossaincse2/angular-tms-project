import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../common/helper/httpHelper';

@Injectable()
export class ContactorService {
    constructor(private httpHelper: HttpHelper) {
    }

    saveContactor(obj): Observable<any> {
        let url = "api/Contactor/saveContactor";
        return this.httpHelper.postHelper(url, obj);
    }
    getAllContactor(): Observable<any> {
        let url = "api/Contactor/getAllContactor";
        return this.httpHelper.postHelper(url, {});
    }

    getFilteredContactor(obj): Observable<any> {
        let url = "api/Contactor/searchContactor";
        return this.httpHelper.postHelper(url, obj);
    }
    
}