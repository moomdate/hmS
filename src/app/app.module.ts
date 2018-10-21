import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { firebaseCon } from './../environments/ConfigFire';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HomepageComponent } from './homepage/homepage.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopmenuComponent } from './topmenu/topmenu.component';
import { MycourseComponent } from './mycourse/mycourse.component';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { ListhwComponent } from './listhw/listhw.component';
import { SendhwComponent } from './sendhw/sendhw.component';
import { UploadHWComponent } from './upload-hw/upload-hw.component';
import { UploadsListComponent } from './uploads/uploads-list/uploads-list.component';
import { UploadDetailComponent } from './uploads/upload-detail/upload-detail.component';
import { UploadFormComponent } from './uploads/upload-form/upload-form.component';
import { DetailsUploadComponent } from './details-upload/details-upload.component';
import { ListUploadComponent } from './list-upload/list-upload.component';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { EnterStudentIdComponent } from './enter-student-id/enter-student-id.component';
import { ViewHWComponent } from './view-hw/view-hw.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RegistComponent } from './regist/regist.component';
import { Nav2Component } from './nav2/nav2.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainPageComponent,
    HomepageComponent,
    TopmenuComponent,
    MycourseComponent,
    ListhwComponent,
    SendhwComponent,
    UploadHWComponent,
    UploadsListComponent,
    UploadDetailComponent,
    UploadFormComponent,
    DetailsUploadComponent,
    ListUploadComponent,
    FormUploadComponent,
    EnterStudentIdComponent,
    ViewHWComponent,
    RegistComponent,
    Nav2Component,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    DlDateTimePickerDateModule,
    AngularFireModule.initializeApp(firebaseCon),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    NgxSpinnerModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
