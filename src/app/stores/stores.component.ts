import { Component, OnInit } from '@angular/core';
import { BackendService, Store } from '../backend.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {

  stores: Store[];

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(): void {
    this.backendService.getStores().subscribe(stores => {
      this.stores = [];
      stores.forEach((store, index) => {
        setTimeout(() => {
          this.stores.push(store);
        }, index * 500 + 500);
      });
    });
  }

  getNewStores(): void {
    this.backendService.addNewStore();
    this.loadStores();
  }

}
