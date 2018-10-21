import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-hw',
  templateUrl: './view-hw.component.html',
  styleUrls: ['./view-hw.component.css']
})
export class ViewHWComponent implements OnInit {
  list = [];
  closeResult: string;
  name;
  detail;
  cid;
  constructor(
    public myau: AngularFireAuth,
    public db: AngularFireDatabase,
    route: ActivatedRoute,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,

  ) {
    const hid = route.snapshot.params['hid'];
    const cc = route.snapshot.params['cc'];
    const uid = localStorage.getItem('uid');
    this.cid = hid;
    const readdb = db.database.ref(`Users/${uid}/courses/${hid}`);
    readdb.once('value').then(data => {
      // console.log(data.val()['name']);
      this.name = data.val()['name'];
      this.detail = data.val()['detail'];
    });
    readdb.child(`${cc}`).once('value').then(data => {
      let myindex = 0;
      // tslint:disable-next-line:forin
      for (let key in data.val()) {
        //his.list.push(key);
        this.list[myindex] = [];
        this.list[myindex].push(key);
        //console.log(data.val()[key]);
        for (let key2 in data.val()[key]) {
          if (key != 'datetime' && key != 'detail') {
            this.list[myindex].push({
              name: data.val()[key][key2]['name'],
              url: data.val()[key][key2]['url']
            })
            //console.log(data.val()[key][key2]['name']);
            //console.log(data.val()[key][key2]['url']);
          }
        }
        myindex++;
      }
      this.spinner.hide();
     // console.log(this.list);
    });
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnInit() {
    this.spinner.show();
  }

}
