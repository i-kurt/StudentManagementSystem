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
    this.httpClient.post<any>(this.service.baseUrl + 'Token/GetToken', { userName: txtKullaniciAdi.value, password: txtSifre.value }).subscribe((data: { Token: string }) => {
      this.service.token = data.Token;
    }, error => {
      this.service.raiseError(error);
    });
  }

  CheckAuthorizeLogin() {
    this.service.CheckAuthorize(this.httpClient);
  }
}
