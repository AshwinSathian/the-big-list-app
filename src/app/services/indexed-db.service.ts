// indexed-db.service.ts

import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IndexedDBService {
  private db!: IDBDatabase;
  private readonly dbName = 'bigListAppDB';
  private readonly storeName = 'tickets';

  constructor() {
    this._initializeDB();
  }

  private _initializeDB() {
    const request = indexedDB.open(this.dbName, 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      this.db = (event.target as IDBOpenDBRequest).result;
      if (!this.db.objectStoreNames.contains(this.storeName)) {
        this.db.createObjectStore(this.storeName, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = (event: Event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
    };

    request.onerror = (event: Event) => {
      console.error('IndexedDB error:', request.error);
    };
  }

  addItem(item: any): Observable<void> {
    return from(
      new Promise<void>((resolve, reject) => {
        const transaction = this.db.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.add(item);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      })
    );
  }

  getItems(): Observable<any[]> {
    return from(
      new Promise<any[]>((resolve, reject) => {
        const transaction = this.db.transaction(this.storeName, 'readonly');
        const store = transaction.objectStore(this.storeName);
        const request = store.getAll();

        request.onsuccess = (event) => {
          console.log((event.target as IDBRequest<any[]>).result);
          resolve((event.target as IDBRequest<any[]>).result);
        };
        request.onerror = () => reject(request.error);
      })
    );
  }
}
