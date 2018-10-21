import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../uploads/shared/upload.service';
import { FileUpload } from '../uploads/shared/upload';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  myuid;
  cardid;
  myh;
  mycid;
  canUp = true;
  alert = false;
  constructor(private uploadService: UploadFileService,
    routes: ActivatedRoute,
    database: AngularFireDatabase,
  ) {
    const myuid = routes.snapshot.params['uid'];
    const mycid = routes.snapshot.params['cid'];
    const myh = routes.snapshot.params['hname'];
    const cardid = routes.snapshot.params['cardid'];
    this.myuid = myuid;
    this.mycid = mycid;
    this.myh = myh;
    this.cardid = cardid;

    const mypath = 'Users/' + this.myuid + '/courses/' + this.mycid + '/' + this.myh + '/datetime';
    database.database.ref(mypath).once('value').then(data => {
      console.log(data.val());
      let mydate = new Date().toLocaleString();
      console.log(mydate);
      if (mydate.valueOf() > data.val().valueOf()) {
        console.log('ไม่ได้');
        this.alert = true;
        this.canUp = true;
      } else {
        this.canUp = false;
        console.log('ส่งได้');
      }
    });
  }

  ngOnInit() {

    //console.log(mypath);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {

    //  let mypath = localStorage.getItem('uploadPath');
    const mypath = 'Users/' + this.myuid + '/courses/' + this.mycid + '/' + this.myh + '/' + this.cardid;
    //console.log(mypath);
    this.uploadService.setPath(mypath);
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress, mypath);

  }

}
