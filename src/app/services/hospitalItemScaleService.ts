import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../common/helper/httpHelper';

@Injectable()
export class HospitalItemScaleService {
    constructor(private httpHelper: HttpHelper) {
    }

    saveHospitalItemScale(obj): Observable<any> {
        let url = "api/HospitalScaleDetail/saveHospitalScaleDetail";
        return this.httpHelper.postHelper(url, obj);
    }
    getAllHospitalItemScale(): Observable<any> {
        let url = "api/HospitalScaleDetail/getAllHospitalScaleDetail";
        return this.httpHelper.postHelper(url, {});
    }

    getFilteredHospitalItemScale(obj): Observable<any> {
        let url = "api/HospitalScaleDetail/searchHospitalScaleDetail";
        return this.httpHelper.postHelper(url, obj);
    } 
    
}