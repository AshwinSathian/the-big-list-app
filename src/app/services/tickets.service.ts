import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Ticket } from '../interfaces/ticket';
import { IndexedDBService } from './indexed-db.service';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private readonly BATCH_SIZE = 100;
  private readonly PAGE_DELAY = 1000;
  private readonly TOTAL_PAGES = 10;
  private readonly API_BASE_URL = 'https://sfe-interview.hoppscotch.com/issues';

  constructor(
    private _http: HttpClient,
    private _indexedDbService: IndexedDBService
  ) {}

  getTicketsByPage(page: number): Observable<any[]> {
    return this._http
      .get<{ tickets: any[] }>(`${this.API_BASE_URL}-${page}.json`)
      .pipe(
        map((response) => response.tickets),
        catchError((error) => {
          console.error(`Error fetching data for page ${page}:`, error);
          return of([]);
        })
      );
  }

  // loadTickets(): Observable<void> {
  //   return from(Array.from({ length: this.TOTAL_PAGES }, (_, i) => i + 1)).pipe(
  //     concatMap((page) =>
  //       defer(() =>
  //         this._http.get<{ tickets: any[] }>(
  //           `${this.API_BASE_URL}-${page}.json`
  //         )
  //       ).pipe(
  //         catchError((error) => {
  //           console.error(`Error fetching data for page ${page}:`, error);
  //           return EMPTY; // Skip page on error
  //         }),
  //         delayWhen(() => timer(this.PAGE_DELAY)) // Delay between page fetches
  //       )
  //     ),
  //     concatMap((response) =>
  //       from(response.tickets).pipe(
  //         concatMap(
  //           (ticket) =>
  //             this._indexedDbService.addItem(ticket).pipe(
  //               catchError((error) => {
  //                 console.error('Error adding item to IndexedDB:', error);
  //                 return EMPTY; // Skip ticket on error
  //               })
  //             ),
  //           delayWhen(() => timer(this.PAGE_DELAY / this.TOTAL_PAGES)) // Delay between ticket batches
  //         ),
  //         catchError((error) => {
  //           console.error('Error processing tickets:', error);
  //           return EMPTY; // Skip batch on error
  //         })
  //       )
  //     ),
  //     catchError((error) => {
  //       console.error('Error in loadTickets:', error);
  //       return EMPTY;
  //     })
  //   );
  // }

  getItems(): Observable<Ticket[]> {
    return this._indexedDbService.getItems();
  }
}
