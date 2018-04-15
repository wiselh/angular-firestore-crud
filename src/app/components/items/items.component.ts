import { Item } from './../../models/Item';
import { ItemService } from './../../services/item.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.css"]
})
export class ItemsComponent implements OnInit {
  items: Item[];
  itemState: Boolean = false;
  itemToEdite: Item;
  constructor(public itemService: ItemService) {}

  ngOnInit() {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  deteleItem(event, item: Item) {
    this.clearState();
    this.itemService.deleteItem(item);
  }

  editItem(event, item: Item) {
    this.itemState = true;
    this.itemToEdite = item;
  }

  updateItem(item: Item) {
    this.itemService.updateItem(item);
    this.clearState();
  }

  clearState() {
    this.itemState = false;
    this.itemToEdite = null;
  }
}
