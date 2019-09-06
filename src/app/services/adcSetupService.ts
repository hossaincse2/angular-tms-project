import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../common/helper/httpHelper';

@Injectable()
export class ADCSetupService {
    constructor(private httpHelper: HttpHelper) {
    }

    saveADCSetup(obj): Observable<any> {
        let url = "api/ADCSetup/saveADCSetup";
        return this.httpHelper.postHelper(url, obj);
    }
    getAllADCSetup(): Observable<any> {
        let url = "api/ADCSetup/getAllADCSetup";
        return this.httpHelper.postHelper(url, {});
    }

    getFilteredADCSetup(obj): Observable<any> {
        let url = "api/ADCSetup/searchADCSetup";
        return this.httpHelper.postHelper(url, obj);
    }

    printADCSetup(obj): Observable<any> {
        let url = "api/ADCSetup/printADCSetup";
        return this.httpHelper.postHelper(url, obj);
    }
    
}