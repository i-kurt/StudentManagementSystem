import { Component, Inject, OnInit } from '@angular/core';
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

  constructor(private service: CommonService, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.httpClient = http;
    this.url = baseUrl + 'Courses/SaveCourse';
    this.baseUrl = baseUrl;
  }

  ngOnInit() {
    this.service.errMSG$.subscribe(res => this.errMSG = res);
    this.service.changeErrorText('');
  }

  AddCourse(courseForm: NgForm) {
    this.service.changeErrorText('');
    this.httpClient.post<any>(this.baseUrl + 'courses/SaveCourse', courseForm.value).subscribe(result => {
      if (result.Err != '') {
        this.service.changeErrorText(result.Err);
      }
      else {
        this.saved.emit();
        document.getElementById('dvForm').hidden = !document.getElementById('dvForm').hidden;
        courseForm.reset();
      }
    }, error => {
      this.service.raiseError(error);
    });
  }
}
