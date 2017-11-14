import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  orders: Observable<any>;

  reportsRef: AngularFirestoreCollection<any>;
  reports: Observable<any>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() { 
    this.orders = this.afs.collection('orders').valueChanges()
    this.reportsRef = this.afs.collection('reports')

    // Map the snapshot to include the document ID
    this.reports = this.afs.collection('reports')
      .snapshotChanges().map(arr => { 
      return arr.map(snap => { 
        const data = snap.payload.doc.data()
        const id = snap.payload.doc.id
        return { ...data, id }
      })
    })
  }


  requestReport() {
    const data = {
      status: 'processing',
      createdAt: new Date()
    }
    this.reportsRef.add(data)
  }

}