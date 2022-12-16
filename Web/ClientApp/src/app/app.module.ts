import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { CommonService } from './common.service';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CourseManagementComponent } from './CourseManagement/CourseManagement.component';
import { CourseAddComponent } from './CourseAdd/CourseAdd.component';
import { StudentManagementComponent } from './StudentManagement/StudentManagement.component';
import { StudentAddComponent } from './StudentAdd/StudentAdd.component';
import { TeacherManagementComponent } from './TeacherManagement/TeacherManagement.component';
import { TeacherAddComponent } from './TeacherAdd/TeacherAdd.component';
import { LoginComponent } from './Login/Login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CourseManagementComponent,
    CourseAddComponent,
    StudentManagementComponent,
    TeacherManagementComponent,
    StudentAddComponent,
    TeacherAddComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'CourseManagement', component: CourseManagementComponent },
      { path: 'StudentManagement', component: StudentManagementComponent },
      { path: 'TeacherManagement', component: TeacherManagementComponent },
      { path: 'Login', component: LoginComponent }
    ])
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
