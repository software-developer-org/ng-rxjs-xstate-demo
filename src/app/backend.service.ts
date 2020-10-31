import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export class Entity {
  constructor(
    public id: number,
    public name: string,
    public description: string
  ) {}
}
@Injectable({
  providedIn: 'root',
})
export class BackendService {
  stores: Entity[] = [];
  products: Entity[] = [];

  constructor() {
    new Array(3)
      .fill('')
      .forEach((_, index) =>
        this.stores.push(
          new Entity(
            index,
            'Store ' + index,
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim excepturi odio cum eligendi, veniam dolores, fuga autem ...'
          )
        )
      );
    new Array(10)
      .fill('')
      .forEach((_, index) =>
        this.products.push(
          new Entity(
            index,
            'Product ' + index,
            'Buy me, consume me, happiness!'
          )
        )
      );
  }

  getStores(): Observable<Entity[]> {
    const obs$ = new Observable<Entity[]>((subscriber) => {
      console.log('>>>stores request to backend');
      setTimeout(() => {
        console.log('>>>stores respond to client');
        subscriber.next(this.stores);
        subscriber.complete();
      }, 200);
    });
    return obs$;
  }

  addNewStore(): void {
    const id = this.stores.length + 1;
    this.stores.push(
      new Entity(
        id,
        'Store ' + id,
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim excepturi odio cum eligendi, veniam dolores, fuga autem ...'
      )
    );
  }

  getStoreById(id: number): Observable<Entity> {
    const obs$ = new Observable<Entity>((subscriber) => {
      console.log(`>>>store ${id} request to backend`);
      setTimeout(() => {
        console.log('>>>stores respond to client');
        const entity = this.stores.find((e) => e.id === id);
        subscriber.next(entity);
        subscriber.complete();
      }, 500);
    });
    return obs$;
  }

  getAddressByStore(storeId: number): Observable<Entity> {
    const obs$ = new Observable<Entity>((subscriber) => {
      console.log(`>>>address for store ${storeId} request to backend`);
      setTimeout(() => {
        console.log('>>>stores respond to client');
        subscriber.next(
          new Entity(storeId, 'Tiny Lane ' + storeId, '123-Acme')
        );
        subscriber.complete();
      }, 1500);
    });
    return obs$;
  }

  getProducts(): Observable<Entity[]> {
    const obs$ = new Observable<Entity[]>((subscriber) => {
      console.log('>>>products request to backend');
      setTimeout(() => {
        console.log('>>>products respond to client');
        subscriber.next(this.products);
        subscriber.complete();
      }, 200);
    });
    return obs$;
  }
}
