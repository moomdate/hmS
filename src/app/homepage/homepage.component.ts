import { Component, OnInit } from '@angular/core';
import { NgbModule, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  closeResult: string;
  listCourse = [];
  items: Observable<any[]>;
  constructor(
    public myau: AngularFireAuth,
    public db: AngularFireDatabase,
    private modalService: NgbModal,
    private router: Router,
    private spinner: NgxSpinnerService

  ) {

    /*let uid = localStorage.getItem('uid');
    db.database.ref(`Users/${uid}/courses/`).once('value').then(data => {
      for (var key in data.val()) {
        this.listCourse.push(key);
      }
    });*/
    myau.auth.onAuthStateChanged(data => {
      // console.log(data);
      if (data != null) {
        router.navigate(['/home']);

      } else {
        router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
    this.spinner.show();
    let uid = localStorage.getItem('uid');
    this.db.list(`Users/${uid}/`).valueChanges().subscribe(data => {
      this.listCourse = [];
      // tslint:disable-next-line:forin
      for (var key in data[0]) {
        if (key != 'detail' && key != 'name'&& key != 'new') {
          this.listCourse.push(key);
        }
      }
      this.spinner.hide();
      //console.log('test',data);
    });

  }
  deletCC(data) {
    console.log(data);
    let uid = localStorage.getItem('uid');
    var course = this.db.database.ref(`Users/${uid}/courses/${data}`);
    course.remove().then(data => {
      //this.router.navigate(['/login']);
    });
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
      let uid = localStorage.getItem('uid');
      var course = this.db.database.ref(`Users/${uid}/courses/${result.id}`);
      course.set({
        name: result.name,
        detail: result.detail
      }).then(data => {
        //this.router.navigate(['/login']);
      });
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
}
