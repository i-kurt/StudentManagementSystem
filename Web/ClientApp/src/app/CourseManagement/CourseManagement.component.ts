import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../common.service';
import { CourseMst } from 'src/app/pocos/CourseMst';

@Component({
  selector: 'app-CourseManagement',
  templateUrl: './CourseManagement.component.html'
})
export class CourseManagementComponent implements OnInit {
  public courses: CourseMst[];
  private httpClient: HttpClient;
  private url: string = '';
  errMSG: string;

  constructor(private service: CommonService, http: HttpClient) {
    this.httpClient = http;
    this.url = service.baseUrl + 'Courses/GetCourses';
    this.GetCourses();
  }

  ngOnInit() {
    this.service.errMSG$.subscribe(res => this.errMSG = res);
    this.service.changeErrorText('');
  }

  GetCourses() {
    this.service.getByURL(this.url, this.httpClient).then(result => {
      if (result.Err != '') {
        this.service.changeErrorText(result.Err);
      } else
        this.courses = result.Value;
    }).catch(err => {
      this.service.raiseError(err);
    });
  }

  DeleteCourse(CID) {
    this.service.changeErrorText('');
    this.service.postByURL(this.service.baseUrl + 'courses/DeleteCourse', this.httpClient, CID).then(result => {
      this.GetCourses();
      if (result.Err != '') {
        this.service.changeErrorText(result.Err);
      }
    }).catch(err => {
      this.service.raiseError(err);
    });
  }
}
