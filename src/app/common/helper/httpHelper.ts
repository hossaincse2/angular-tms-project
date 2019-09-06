import { Observable } from 'rxjs';
import { LocalStorageService } from 'angular-web-storage';
import { RequestMessage } from "../requestMessage";
import { Injectable } from "@angular/core";
import { Loader } from "../loader/loader.component";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class HttpHelper {

  // postHelperForPrint(url: string, obj: any): Observable<any> {
  //     throw new Error("Method not implemented.");
  // }

  static numberOfRequest = 0;

private baseUrl = 'http://18.219.17.124:8070/';
  //private baseUrl = 'http://10.10.10.2:5656/';

   //  private baseUrl = 'http://localhost:49378/';

  private requestMessage: RequestMessage = new RequestMessage();

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService, private loadingSpinner: Loader) {
  }

  public hideLoader() {
    HttpHelper.numberOfRequest = 0;
    this.loadingSpinner.hide();
  }

  postHelper(url, obj): Observable<any> {
    url = this.baseUrl + url;
    HttpHelper.numberOfRequest++;
    console.log(url);
    if (HttpHelper.numberOfRequest === 1) {
      this.loadingSpinner.show();
    }
    this.requestMessage.requestObj = obj;
    this.requestMessage.branchID = 1;
    this.requestMessage.Token = this.localStorageService.get('token');
    this.requestMessage.pageIndex = 1;
    this.requestMessage.pageSize = 0;
    //alert(this.localStorageService.get("token"));

    // console.log('----------------Requested Object----------------------------');
    // console.log(JSON.stringify(this.requestMessage, null, 2));
    //console.log('----------------Requested Object----------------------------');

    // const headers = new Headers({'Content-Type': 'application/json'});
    //
    // const options = new RequestOptions({headers: headers, params: JSON.stringify(this.requestMessage)});
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

    return this.httpClient.post(url, JSON.stringify(this.requestMessage), { headers: headers }).map(
      value => {

        // console.log('----------------Response Object----------------------------');
        //  console.log(JSON.stringify(value, null, 2));
        // console.log('----------------Response Object----------------------------');
        return value;
      },
      error => {
        alert('error');
      },
    ).finally(() => {
      HttpHelper.numberOfRequest--;
      if (HttpHelper.numberOfRequest === 0) {
        this.loadingSpinner.hide();
      }
    });
  }
}
