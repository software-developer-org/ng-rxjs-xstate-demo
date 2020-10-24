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
    const obs$ = new Observable<Entity[]>(subscriber => {
      console.log('>>>stores request to backend');
      setTimeout(() => {
        console.log('>>>stores respond to client');
        subscriber.next(this.stores);
        subscriber.complete();
      }, 2000);
    });
    return obs$;
  }

  addNewStore(): void {
    const id = this.stores.length + 1;
    this.stores.push(new Entity(id, 'Store ' + id));
  }

  getProducts(): Observable<Entity[]> {
    const obs$ = new Observable<Entity[]>(subscriber => {
      console.log('>>>products request to backend');
      setTimeout(() => {
        console.log('>>>products respond to client');
        subscriber.next(this.products);
        subscriber.complete();
      }, 2000);
    });
    return obs$;
  }
}
