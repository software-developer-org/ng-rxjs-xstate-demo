import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BackendService, Entity } from '../backend.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {

  stores: Entity[];

  constructor(private backendService: BackendService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.backendService.getStores().subscribe(stores => {
      this.stores = [];
      stores.forEach((store, index) => {
        setTimeout(() => {
          this.stores.push(store);
          if (stores.length === index + 1) {
            this.spinner.hide();
          }
        }, index * 300 + 300);
      });
    });
    this.spinner.show();
  }

  loadAdditionalData(): void {
    this.backendService.addNewStore();
    this.loadData();
  }

}
