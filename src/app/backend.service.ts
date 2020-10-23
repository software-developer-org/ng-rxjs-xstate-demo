import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export class Entity {
  constructor(public id: number, public name: string) {}
}
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  stores: Entity[] = [];
  products: Entity[] = [];

  constructor() {
    new Array(3).fill('').forEach((_, index) => this.stores.push(new Entity(index, 'Store ' + index)));
    new Array(10).fill('').forEach((_, index) => this.products.push(new Entity(index, 'Product ' + index)));
  }

  getStores(): Observable<Entity[]> {
    return of(this.stores);
  }

  addNewStore(): void {
    const id = this.stores.length + 1;
    this.stores.push(new Entity(id, 'Store ' + id));
  }

  getProducts(): Observable<Entity[]> {
    return of(this.products);
  }
}
