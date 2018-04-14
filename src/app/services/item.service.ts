import { Observable } from 'rxjs/observable';
import { Item } from './../models/Item';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()
export class ItemService {

  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(public _db: AngularFirestore) {
    this.items = _db.collection('items').valueChanges();
   }

   getItems() {
    return this.items;
   }
}
