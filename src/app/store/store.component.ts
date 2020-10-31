import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BackendService, Entity } from '../backend.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  @Input() store: Entity;
  products: Entity[];

  constructor(private backendService: BackendService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.backendService.getProducts().subscribe(product => {
      this.products = [];
      product.forEach((store, index) => {
        setTimeout(() => {
          this.products.push(store);
          if (product.length === index + 1) {
            this.spinner.hide();
          }
        }, index * 300 + 300);
      });
    });
    this.spinner.show();
  }

}
