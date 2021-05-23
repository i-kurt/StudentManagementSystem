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
    this.service.getByURL(this.url, this.httpClient).subscribe(result => {
      if (result.Err != '') {
        this.service.changeErrorText(result.Err);
      }
      else {
        this.courses = result.Value;
      }
    }, error => {
      this.service.raiseError(error);
    });
  }

  DeleteCourse(CID) {
    this.service.changeErrorText('');
    this.httpClient.post<any>(this.service.baseUrl + 'courses/DeleteCourse', CID).subscribe(result => {
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
