import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BackendService, Entity } from '../backend.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  entities: Entity[];

  constructor(private backendService: BackendService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.backendService.getProducts().subscribe(product => {
      this.entities = [];
      product.forEach((store, index) => {
        setTimeout(() => {
          this.entities.push(store);
          if (product.length === index + 1) {
            this.spinner.hide();
          }
        }, index * 500 + 500);
      });
    });
    this.spinner.show();
  }

}
