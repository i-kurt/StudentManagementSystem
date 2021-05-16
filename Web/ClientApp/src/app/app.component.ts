import { Component, OnInit } from '@angular/core';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app';
  errMSG: string;

  constructor(private service: CommonService) { }

  ngOnInit() {
    this.service.errMSG$.subscribe(res => this.errMSG = res)
  }
}
