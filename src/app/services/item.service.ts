import { Observable } from 'rxjs/observable';
import { Item } from './../models/Item';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()
export class ItemService {

  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  itemDoc: AngularFirestoreDocument<Item>;

  constructor(public _db: AngularFirestore) {
    // this.items = _db.collection('items').valueChanges();
    this.itemsCollection = _db.collection('items', ref => ref.orderBy('title', 'asc'));

    this.items = _db.collection('items').snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      });
    });
   }

   getItems() {
    return this.items;
   }

   addItem(item: Item) {
    this.itemsCollection.add(item);
   }

  deleteItem(item: Item) {
    this.itemDoc = this._db.doc(`/items/${item.id}`);
    this.itemDoc.delete();
  }


}
