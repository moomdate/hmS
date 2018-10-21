import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-listhw',
  templateUrl: './listhw.component.html',
  styleUrls: ['./listhw.component.css']
})
export class ListhwComponent implements OnInit {
  uid;
  cid;
  keyHw = [];
  constructor(
    db: AngularFireDatabase,
    route: Router,
    routes: ActivatedRoute,
    private spinner: NgxSpinnerService,

  ) {

    const myuid = routes.snapshot.params['uid'];
    const mycid = routes.snapshot.params['cid'];
    this.uid = myuid;
    this.cid = mycid;
    const readdb = db.database.ref(`Users/${myuid}/courses/${mycid}`).once('value').then(data => {
      console.log(data.val());
      // tslint:disable-next-line:forin
      for (let key in data.val()) {
        // console.log(key);
        if (key != 'detail' && key != 'name') {
          this.keyHw.push({
            name: key,
            uid: myuid,
            cid: mycid,
            detail: data.val()[key]['detail'],
            date: data.val()[key]['datetime']
          });
        }
      }
      this.spinner.hide();
    });
  }

  ngOnInit() {
    this.spinner.show();
  }

}
