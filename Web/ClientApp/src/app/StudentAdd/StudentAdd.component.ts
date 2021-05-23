import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { NgForm } from '@angular/forms'
import { StudentMst } from 'src/app/pocos/StudentMst';
import { HttpClient } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-StudentAdd',
  templateUrl: './StudentAdd.component.html',
})
export class StudentAddComponent implements OnInit {
  errMSG: string;
  closeResult = '';
  newStudent = new StudentMst();
  private httpClient: HttpClient;
  private url: string = '';
  @Output() saved = new EventEmitter();

  constructor(private service: CommonService, http: HttpClient) {
    this.httpClient = http;
    this.url = service.baseUrl + 'student/SaveCourse';
  }

  ngOnInit() {
    this.service.errMSG$.subscribe(res => this.errMSG = res);
    this.service.changeErrorText('');
  }

  AddStudent(studentForm: NgForm) {
    this.service.changeErrorText('');
    this.httpClient.post<any>(this.service.baseUrl + 'student/SaveStudent', studentForm.value).subscribe(result => {
      if (result.Err != '') {
        this.service.changeErrorText(result.Err);
      }
      else {
        this.saved.emit();
        document.getElementById('dvForm').hidden = !document.getElementById('dvForm').hidden;
        studentForm.reset();
      }
    }, error => {
      this.service.raiseError(error);
    });
  }
}
