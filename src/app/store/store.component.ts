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
  }

  loadData(): void {
    // get store
    const id = Number.parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.backendService.getStoreById(id).subscribe((store) => {
      this.store = store;
    });

    // get address
    this.backendService.getAddressByStore(id).subscribe((address) => {
      this.address = address;
    });

    // get products
    this.backendService.getProducts().subscribe((products) => {
      this.products = [];
      products.forEach((product, index) => {
        setTimeout(() => {
          console.log('displaying product', product.id);
          this.products.push(product);
          if (products.length === index + 1) {
            this.spinner.hide();
          }
        }, index * 200 + 200);
      });
    });
    this.spinner.show();

  }
}
