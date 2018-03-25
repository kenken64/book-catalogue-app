import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from "rxjs/Rx";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Bookdetails } from '../../shared/models/bookdetails';
import { UUID } from 'angular2-uuid';

@Injectable()
export class BookfirebaseService {
  private bookDetailsDoc: AngularFirestoreDocument<Bookdetails>;
  private bookdetailsCollection: AngularFirestoreCollection<Bookdetails>;
  item: Observable<Bookdetails>;
  constructor(private db:AngularFirestore) { 
  }

  createNewBookDetails(bookdetails:any) {
      const bookDetailsToSave = Object.assign({}, bookdetails);
      let uuid = UUID.UUID();
      bookDetailsToSave._id = uuid;
      this.bookDetailsDoc = this.db.doc<Bookdetails>('bookdetails/' + bookDetailsToSave.email);
      this.item = this.bookDetailsDoc.valueChanges();
      this.bookDetailsDoc.set(bookDetailsToSave);
  }

  getAllBookDetails() : Observable<Bookdetails[]>{
    this.bookdetailsCollection = this.db.collection<Bookdetails>('bookdetails');
    return this.bookdetailsCollection.valueChanges();
  }


}
