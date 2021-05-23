import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class CommonService {
  private errMSG = new BehaviorSubject('');
  errMSG$ = this.errMSG.asObservable();
  token: string = "";
  baseUrl: string = "";

  constructor(private router: Router) {
  }

  changeErrorText(err: string) {
    this.errMSG.next(err);
  }

  raiseError(err: any) {
    switch (err.status) {
      case 401:
        this.errMSG.next("Erişim reddedildi!");
        this.router.navigateByUrl(this.baseUrl + "/Login")
        break;
      case 404:
        this.errMSG.next("Sayfa bulunamadı!");
        break;
      case 403:
        this.errMSG.next("Erişim yetkiniz bulunmamaktadır!");
        break;
      case 500:
        this.errMSG.next("Sunucu hatası! " + err.data);
        break;
      default:
        {
          this.errMSG.next("Hata! Status:" + err.status + " Msg:" + err.message);
        }
    }
  }

  CheckAuthorize(httpClient: HttpClient) {
    //let _header = new HttpHeaders({
    //  'Content-Type': 'application/json',
    //  'Authorization': 'Bearer ' + this.token
    //});
    //httpClient.get<any>(this.baseUrl + 'Courses/GetCourses', { headers: _header }).subscribe(result => {
    //  this.token = result;
    //}, error => {
    //  if (error.status == 401) {
    //    this.router.navigateByUrl(this.baseUrl + "/Login");
    //  }
    //  else {
    //    this.raiseError(error);
    //  }
    //});
    if (this.token == "") { this.router.navigateByUrl(this.baseUrl + "/Login") }
  }

  async getByURL(strURL: string, httpClient: HttpClient): Promise<any> {
    let _header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

    this.changeErrorText('');

    return await httpClient.get<any>(strURL, { headers: _header }).toPromise();
  }

  async postByURL(strURL: string, httpClient: HttpClient, prms: any): Promise<any> {
    let _header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

    this.changeErrorText('');

    return await httpClient.post<any>(strURL, prms, { headers: _header }).toPromise();
  }
}
