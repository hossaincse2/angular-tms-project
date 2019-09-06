import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../common/helper/httpHelper';

@Injectable()
export class RequestService {
    constructor(private httpHelper: HttpHelper) {
    }

    saveRequest(obj): Observable<any> {
        let url = "api/Request/saveRequest";
        return this.httpHelper.postHelper(url, obj);
    }
    getAllRequest(): Observable<any> {
        let url = "api/Request/getAllRequest";
        return this.httpHelper.postHelper(url, {});
    }

    getFilteredRequest(obj): Observable<any> {
        let url = "api/Request/SearchRequest";
        return this.httpHelper.postHelper(url, obj);
    }

    approveRequest(obj): Observable<any> {
        let url = "api/Request/ApproveRequest";
        return this.httpHelper.postHelper(url, obj);
    }
    rejectRequest(obj): Observable<any> {
        let url = "api/Request/RejectRequest";
        return this.httpHelper.postHelper(url, obj);
    }

    downloadRequest(obj): Observable<any> {
        let url = "api/Request/PrintRequest";
        return this.httpHelper.postHelper(url, obj);
    }
    
}