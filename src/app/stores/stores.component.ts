import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BackendService, Store } from '../backend.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {

  stores: Store[];

  constructor(private backendService: BackendService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(): void {
    this.backendService.getStores().subscribe(stores => {
      this.spinner.show();
      this.stores = [];
      stores.forEach((store, index) => {
        setTimeout(() => {
          this.stores.push(store);
          if (stores.length === index + 1) {
            this.spinner.hide();
          }
        }, index * 500 + 500);
      });
    });
  }

  getNewStores(): void {
    this.backendService.addNewStore();
    this.loadStores();
  }

}
