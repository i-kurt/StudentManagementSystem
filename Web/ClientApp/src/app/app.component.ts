import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app';
  errMSG: string;
  private httpClient: HttpClient;

  constructor(private service: CommonService, @Inject('BASE_URL') baseUrl: string, http: HttpClient) {
    service.baseUrl = baseUrl;
    this.httpClient = http;
  }

  ngOnInit() {
    this.service.errMSG$.subscribe(res => this.errMSG = res)
    this.service.CheckAuthorize(this.httpClient);
  }
}
