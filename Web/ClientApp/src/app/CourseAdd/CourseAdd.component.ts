import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { NgForm } from '@angular/forms'
import { CourseMst } from 'src/app/pocos/CourseMst';
import { HttpClient } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-CourseAdd',
  templateUrl: './CourseAdd.component.html',
})
export class CourseAddComponent implements OnInit {
  errMSG: string;
  closeResult = '';
  newCourse = new CourseMst();
  private httpClient: HttpClient;
  private url: string = '';
  private baseUrl: string = '';
  @Output() saved = new EventEmitter();

  constructor(private service: CommonService, http: HttpClient) {
    this.httpClient = http;
    this.url = service.baseUrl + 'Courses/SaveCourse';
  }

  ngOnInit() {
    this.service.errMSG$.subscribe(res => this.errMSG = res);
    this.service.changeErrorText('');
  }

  AddCourse(courseForm: NgForm) {
    this.service.changeErrorText('');
    this.service.postByURL(this.baseUrl + 'courses/SaveCourse', this.httpClient, courseForm.value).then(result => {
      if (result.Err != '') {
        this.service.changeErrorText(result.Err);
      }
      else {
        this.saved.emit();
        document.getElementById('dvForm').hidden = !document.getElementById('dvForm').hidden;
        courseForm.reset();
      }
    }).catch(error => {
      this.service.raiseError(error);
    });
  }
}
