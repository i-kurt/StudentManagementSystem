import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class CommonService {
  private errMSG = new BehaviorSubject('');
  errMSG$ = this.errMSG.asObservable();

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
}
