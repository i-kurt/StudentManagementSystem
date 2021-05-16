import { Component, Inject, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { NgForm } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';
import { TeacherMst } from '../pocos/TeacherMst';

@Component({
  selector: 'app-TeacherAdd',
  templateUrl: './TeacherAdd.component.html',
})
export class TeacherAddComponent implements OnInit {
  errMSG: string;
  closeResult = '';
  newTeacher = new TeacherMst();
  private httpClient: HttpClient;
  private url: string = '';
  private baseUrl: string = '';
  @Output() saved = new EventEmitter();

  constructor(private service: CommonService, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.httpClient = http;
    this.url = baseUrl + 'teacher/SaveTeacher';
    this.baseUrl = baseUrl;
  }

  ngOnInit() {
    this.service.errMSG$.subscribe(res => this.errMSG = res);
    this.service.changeErrorText('');
  }

  AddTeacher(teacherForm: NgForm) {
    this.service.changeErrorText('');
    this.httpClient.post<any>(this.baseUrl + 'teacher/SaveTeacher', teacherForm.value).subscribe(result => {
      if (result.Err != '') {
        this.service.changeErrorText(result.Err);
      }
      else {
        this.saved.emit();
        document.getElementById('dvForm').hidden = !document.getElementById('dvForm').hidden;
        teacherForm.reset();
      }
    }, error => {
      this.service.raiseError(error);
    });
  }
}
