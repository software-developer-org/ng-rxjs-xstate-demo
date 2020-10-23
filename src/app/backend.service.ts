import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export class Store {
  constructor(public id: number, public name: string) {}
}
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  stores: Store[] = [];

  constructor() {
    new Array(3).fill('').forEach((_, index) => this.stores.push(new Store(index, 'Store ' + index)));
  }

  getStores(): Observable<Store[]> {
    return of(this.stores);
  }

  addNewStore(): void {
    const id = this.stores.length + 1;
    this.stores.push(new Store(id, 'Store ' + id));
  }
}
