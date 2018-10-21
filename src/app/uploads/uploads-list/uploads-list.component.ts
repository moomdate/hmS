import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { UploadFileService } from '../shared/upload.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-uploads-list',
  templateUrl: './uploads-list.component.html',
  styleUrls: ['./uploads-list.component.css']
})
export class UploadsListComponent implements OnInit {
  fileUploads: any[];
  myuid;
  cardid;
  myh;
  mycid;
  constructor(private uploadService: UploadFileService,
    routes: ActivatedRoute,
  ) {
    const myuid = routes.snapshot.params['uid'];
    const mycid = routes.snapshot.params['cid'];
    const myh = routes.snapshot.params['hname'];
    const cardid = routes.snapshot.params['cardid'];
    this.myuid = myuid;
    this.mycid = mycid;
    this.myh = myh;
    this.cardid = cardid;

  }

  ngOnInit() {
    // Use snapshotChanges().pipe(map()) to store the key
    const mypath = 'Users/' + this.myuid + '/courses/' + this.mycid + '/' + this.myh + '/' + this.cardid;
    this.uploadService.setPath(mypath);
    this.uploadService.getFileUploads(6).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });
  }

}
