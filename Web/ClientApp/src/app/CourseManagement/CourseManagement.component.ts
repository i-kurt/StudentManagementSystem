import { Component, Inject, OnInit } from '@angular/core';
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
  private baseUrl: string = '';
  errMSG: string;

  constructor(private service: CommonService, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.httpClient = http;
    this.url = baseUrl + 'Courses/GetCourses';
    this.baseUrl = baseUrl;
    this.httpClient.get<any>(this.url).subscribe(result => {
      this.courses = result.Value;
      if (result.Err != '') {
        this.service.changeErrorText(result.Err);
      }
    }, error => {
      console.error(error);
      this.service.raiseError(error);
    });
  }

  ngOnInit() {
    this.service.errMSG$.subscribe(res => this.errMSG = res);
    this.service.changeErrorText('');
  }

  GetCourses() {
    this.service.changeErrorText('');
    this.httpClient.get<any>(this.url).subscribe(result => {
      this.courses = result.Value;
      if (result.Err != '') {
        this.service.changeErrorText(result.Err);
      }
    }, error => {
      console.error(error);
      this.service.raiseError(error);
    });
  }

  DeleteCourse(CID) {
    this.service.changeErrorText('');
    this.httpClient.post<any>(this.baseUrl + 'courses/DeleteCourse', CID).subscribe(result => {
      this.GetCourses();
      if (result.Err != '') {
        this.service.changeErrorText(result.Err);
      }
    }, error => {
      console.error(error);
      this.service.raiseError(error);
    });
  }
}
