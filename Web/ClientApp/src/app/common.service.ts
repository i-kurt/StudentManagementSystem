import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class CommonService {
  private errMSG = new BehaviorSubject('');
  errMSG$ = this.errMSG.asObservable();
  token: string = "";
  baseUrl: string = "";

  constructor() {
  }

  changeErrorText(err: string) {
    this.errMSG.next(err);
  }

  raiseError(err: any) {
    switch (err.status) {
      case 401:
        this.errMSG.next("Erişim reddedildi!");
        this.token = "";
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
