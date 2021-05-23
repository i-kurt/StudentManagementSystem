import { Component, OnInit } from '@angular/core';
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
  @Output() saved = new EventEmitter();

  constructor(private service: CommonService, http: HttpClient) {
    this.httpClient = http;
    this.url = service.baseUrl + 'teacher/SaveTeacher';
  }

  ngOnInit() {
    this.service.errMSG$.subscribe(res => this.errMSG = res);
    this.service.changeErrorText('');
  }

  AddTeacher(teacherForm: NgForm) {
    this.service.changeErrorText('');
    this.service.postByURL(this.service.baseUrl + 'teacher/SaveTeacher', this.httpClient, teacherForm.value).then(result => {
      if (result.Err != '') {
        this.service.changeErrorText(result.Err);
      }
      else {
        this.saved.emit();
        document.getElementById('dvForm').hidden = !document.getElementById('dvForm').hidden;
        teacherForm.reset();
      }
    }).catch(error => {
      this.service.raiseError(error);
    });
  }
}
