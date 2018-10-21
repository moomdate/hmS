import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { NgxSpinnerService } from 'ngx-spinner';@Component({
  selector: 'app-mycourse',
  templateUrl: './mycourse.component.html',
  styleUrls: ['./mycourse.component.css']
})
export class MycourseComponent implements OnInit {
  couseName: string;
  couseDetail: string;
  cid;
  showAddHM = false;
  myDate;
  listHomework = [];
  constructor(
    public myau: AngularFireAuth,
    public db: AngularFireDatabase,
    route: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) {

    const mycid = route.snapshot.params['cid'];
    this.cid = mycid;
    // console.log(mycid)
    
    console.log(mycid);
    const uid = localStorage.getItem('uid');
    const readdb = db.database.ref(`Users/${uid}/courses/${mycid}`);
    readdb.once('value').then(data => {
      console.log(data.val());
      this.couseName = data.val().name;
      this.couseDetail = data.val().detail;

  });
  /*readdb.child('').once('value').then(data => {

    for (var key in data.val()) {
    this.listCourse.push(key);
    }

  });*/


  }
  deletCC(data) {
    console.log(data);
    let uid = localStorage.getItem('uid');
    var course = this.db.database.ref(`Users/${uid}/courses/${this.cid}/${data}`);
    course.remove().then(data => {
      //this.router.navigate(['/login']);
    });
  }
  updateDate(even) {
    //  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let newDate = even.toLocaleString();
    this.myDate = newDate;
    console.log(newDate);
  }
  SaveData(topic: string, mytime, detail: string) {
    //console.log(`id:${this.state.courseID} name:${this.state.cname} detail:${this.state.cdetail}`);
    let uid = localStorage.getItem('uid');
    let newDate = mytime.toLocaleString();
    console.log('topic', topic);
    var course = this.db.database.ref(`Users/${uid}/courses/${this.cid}/${topic}`);
    course.set({
      datetime: newDate,
      detail: detail
    }).then(data => {
      // tslint:disable-next-line:no-unused-expression
      this.showAddHM = false;
      console.log('close');

    });
  }
  ngOnInit() {
    this.spinner.show();
    let uid = localStorage.getItem('uid');
    this.items = this.db.list(`Users/${uid}/`).valueChanges().subscribe(data => {
      this.listHomework = [];
      // tslint:disable-next-line:forin
      for (var key in data[0][this.cid]) {
        if (key != 'detail' && key != 'name') {
          this.listHomework.push(key);
        }
      }
      this.spinner.hide();
      //console.log('test', );
    });
  }
  addHM() {
    if (this.showAddHM === true) {
      this.showAddHM = false;
    } else {
      this.showAddHM = true;
    }
    //console.log('add hm');
  }

}
