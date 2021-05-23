import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../common.service';
import { StudentMst } from 'src/app/pocos/StudentMst';

@Component({
  selector: 'app-StudentManagement',
  templateUrl: './StudentManagement.component.html'
})
export class StudentManagementComponent implements OnInit {
  public students: StudentMst[];
  private httpClient: HttpClient;
  private url: string = '';
  errMSG: string;

  constructor(private service: CommonService, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.httpClient = http;
    this.url = service.baseUrl + 'Student/GetStudents';
    this.service.getByURL(this.url, this.httpClient).then(result => {
      this.students = result.Value;
      if (result.Err != '') {
        this.service.changeErrorText(result.Err);
      }
    }).catch(error => {
      this.service.raiseError(error);
    });
  }

  ngOnInit() {
    this.service.errMSG$.subscribe(res => this.errMSG = res);
    this.service.changeErrorText('');
  }

  GetStudents() {
    this.service.changeErrorText('');
    this.service.getByURL(this.url, this.httpClient).then(result => {
      this.students = result.Value;
      if (result.Err != '') {
        this.service.changeErrorText(result.Err);
      }
    }).catch(error => {
      this.service.raiseError(error);
    });
  }

  DeleteStudent(SID) {
    this.service.changeErrorText('');
    this.service.postByURL(this.service.baseUrl + 'Student/DeleteStudent', this.httpClient, SID).then(result => {
      this.GetStudents();
      if (result.Err != '') {
        this.service.changeErrorText(result.Err);
      }
    }).catch(error => {
      this.service.raiseError(error);
    });
  }
}
