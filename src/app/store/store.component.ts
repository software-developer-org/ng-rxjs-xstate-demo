import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BackendService, Entity } from '../backend.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  store: Entity;
  address: Entity;
  products: Entity[];

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadData();

    // get store
    const id = Number.parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.backendService.getStoreById(id).subscribe((store) => {
      this.store = store;
    });

    // get address
    this.backendService.getAddressByStore(id).subscribe((address) => {
      this.address = address;
    });
  }

  loadData(): void {
    this.backendService.getProducts().subscribe((product) => {
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
