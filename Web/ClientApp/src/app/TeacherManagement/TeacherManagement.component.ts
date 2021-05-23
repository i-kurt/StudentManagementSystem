import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from '../common.service';
import { TeacherMst } from 'src/app/pocos/TeacherMst';
import { CourseMst } from '../pocos/CourseMst';
import { TeacherCourse } from '../pocos/TeacherCourse';

@Component({
  selector: 'app-TeacherManagement',
  templateUrl: './TeacherManagement.component.html'
})
export class TeacherManagementComponent implements OnInit {
  public teachers: TeacherMst[];
  private httpClient: HttpClient;
  private url: string = '';
  errMSG: string;
  selectedTeacher: TeacherMst;
  TeacherCoursesExcept: CourseMst[];
  TeacherCourses: CourseMst[];
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private service: CommonService, http: HttpClient) {
    this.httpClient = http;
    this.url = service.baseUrl + 'Teacher/GetTeachers';
    this.httpClient.get<any>(this.url).subscribe(result => {
      this.teachers = result.Value;
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

  GetTeachers() {
    this.service.changeErrorText('');
    this.httpClient.get<any>(this.url).subscribe(result => {
      this.teachers = result.Value;
      if (result.Err != '') {
        this.service.changeErrorText(result.Err);
      }
    }, error => {
      this.service.raiseError(error);
    });
  }

  DeleteTeacher(TID) {
    if (confirm('Are you sure?')) {
      this.service.changeErrorText('');
      this.httpClient.post<any>(this.service.baseUrl + 'Teacher/DeleteTeacher', TID).subscribe(result => {
        this.GetTeachers();
        if (result.Err != '') {
          this.service.changeErrorText(result.Err);
        }
      }, error => {
        this.service.raiseError(error);
      });
    }
  }

  getTeacherCoursesExcept(TID) {
    this.service.changeErrorText('');
    this.httpClient.get<any>(this.service.baseUrl + 'Teacher/GetCoursesExcept/?tid=' + TID, this.httpOptions).subscribe((result: any) => {
      this.TeacherCoursesExcept = result.Value;
      if (result.Err != '') {
        this.service.changeErrorText(result.Err);
      }
    }, error => {
      this.service.raiseError(error);
    });
  }

  getTeacherCourses(TID) {
    this.service.changeErrorText('');
    this.httpClient.get<any>(this.service.baseUrl + 'Teacher/GetTeacherCourses/?tid=' + TID).subscribe((result: any) => {
      this.TeacherCourses = result.Value;
      if (result.Err != '') {
        this.service.changeErrorText(result.Err);
      }
    }, error => {
      this.service.raiseError(error);
    });
  }

  SelectTeacher(t: TeacherMst) {
    this.selectedTeacher = t;
    this.getTeacherCoursesExcept(t.Tid);
    this.getTeacherCourses(t.Tid);
  }

  AddCourse(CID) {
    this.service.changeErrorText('');
    var tc = new TeacherCourse();
    tc.Cid = CID;
    tc.Tid = this.selectedTeacher.Tid;
    this.httpClient.post<any>(this.service.baseUrl + 'Teacher/AddCourse', tc).subscribe(result => {
      if (result.Err != '') {
        this.service.changeErrorText(result.Err);
      }
      else {
        this.SelectTeacher(this.selectedTeacher);
      }
    }, error => {
      this.service.raiseError(error);
    });
  }

  DeleteCourse(CID) {
    this.service.changeErrorText('');
    var tc = new TeacherCourse();
    tc.Cid = CID;
    tc.Tid = this.selectedTeacher.Tid;
    this.httpClient.post<any>(this.service.baseUrl + 'Teacher/DeleteCourse', tc).subscribe(result => {
      if (result.Err != '') {
        this.service.changeErrorText(result.Err);
      }
      else {
        this.SelectTeacher(this.selectedTeacher);
      }
    }, error => {
      this.service.raiseError(error);
    });
  }
}
