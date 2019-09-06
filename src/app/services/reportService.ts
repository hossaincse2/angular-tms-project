import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../common/helper/httpHelper';

@Injectable()
export class ReportService {
    constructor(private httpHelper: HttpHelper) {
    }

    getButcheryStatement(obj): Observable<any> {
        let url = "api/ButcheryDemand/ButcheryDemandStatement";
        return this.httpHelper.postHelper(url, obj);
    }

    

    getButcheryContractorBill(obj): Observable<any> {
        let url = "api/ButcheryDemand/GetContractorBill";
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