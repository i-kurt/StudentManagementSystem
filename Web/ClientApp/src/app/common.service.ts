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
    let _header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    httpClient.get<any>(this.baseUrl + 'Courses/GetCourses', { headers: _header }).subscribe(result => {
      this.token = result;
    }, error => {
      if (error.status == 401) {
        this.router.navigateByUrl(this.baseUrl + "/Login");
      }
      else {
        this.raiseError(error);
      }
    });
  }

  getByURL(strURL: string, httpClient: HttpClient): Observable<any> {
    let _header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    this.changeErrorText('');
    return httpClient.get<any>(strURL, { headers: _header }) as Observable<any>;
  }
}
