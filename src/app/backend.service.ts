import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export class Entity {
  constructor(
    public id: number,
    public name: string,
    public description: string
  ) {}
}

export function getTime(): string {
  const now = new Date();
  return now.getHours() + ':' + now.getMinutes() + ':' + (now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()) +
   '.' + now.getMilliseconds();
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
    console.log(getTime(), 'Request GET /stores');
    const obs$ = new Observable<Entity[]>((subscriber) => {
      setTimeout(() => {
        console.log(getTime(), 'Response GET /stores');
        subscriber.next(this.stores);
        subscriber.complete();
      }, 1000);
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
    console.log(getTime(), `Request GET /store/${id}`);
    const obs$ = new Observable<Entity>((subscriber) => {
      setTimeout(() => {
        console.log(getTime(), `Response GET /store/${id}`);
        const entity = this.stores.find((e) => e.id === id);
        subscriber.next(entity);
        subscriber.complete();
      }, 500);
    });
    return obs$;
  }

  getAddressByStore(storeId: number): Observable<Entity> {
    const obs$ = new Observable<Entity>((subscriber) => {
      console.log(getTime(), `Request GET /store/${storeId}/address`);
      setTimeout(() => {
        console.log(getTime(), `Response GET /store/${storeId}/address`);
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
      console.log(getTime(), `Request GET /products`);
      setTimeout(() => {
        console.log(getTime(), `Response GET /products`);
        subscriber.next(this.products);
        subscriber.complete();
      }, 200);
    });
    return obs$;
  }
}
