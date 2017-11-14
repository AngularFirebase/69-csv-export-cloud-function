import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'report-link',
  templateUrl: './report-link.component.html',
  styleUrls: ['./report-link.component.sass'],
})
export class ReportLinkComponent implements OnInit {

  @Input() report: any;
  downloadUrl: Observable<string>;

  constructor() { }

  ngOnInit() {
    const reportRef = firebase.storage().ref(`reports/${this.report.id}.csv`);
    const promise = reportRef.getDownloadURL()

    this.downloadUrl = Observable.fromPromise(promise)
  }

}
