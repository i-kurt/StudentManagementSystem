import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-login',
  templateUrl: './Login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private httpClient: HttpClient, private service: CommonService) { }

  ngOnInit() {
  }

  Login(txtKullaniciAdi: HTMLInputElement, txtSifre: HTMLInputElement) {
    this.service.postByURL(this.service.baseUrl + 'Token/GetToken', this.httpClient, { userName: txtKullaniciAdi.value, password: txtSifre.value })
      .then(result => {
        if (result.Err != '') {
          this.service.changeErrorText(result.Err);
        } else
          this.service.token = result.Value;
      }).catch(err => {
        this.service.raiseError(err);
      });
  }
}
