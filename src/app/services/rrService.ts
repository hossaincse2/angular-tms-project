import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../common/helper/httpHelper';

@Injectable()
export class RRService {
    constructor(private httpHelper: HttpHelper) {
    }

    saveRR(obj): Observable<any> {
        let url = "api/RR/saveRR";
        return this.httpHelper.postHelper(url, obj);
    }
    getAllRR(): Observable<any> {
        let url = "api/RR/getAllRR";
        return this.httpHelper.postHelper(url, {});
    }

    getFilteredRR(obj): Observable<any> {
        let url = "api/RR/searchRR";
        return this.httpHelper.postHelper(url, obj);
    }

    printRR(obj): Observable<any> {
        let url = "api/RR/printRR";
        return this.httpHelper.postHelper(url, obj);
    }
    
}