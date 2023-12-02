import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { Ticket } from '../interfaces/ticket';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private _tickets = new BehaviorSubject<Ticket[]>([]);
  tickets$ = this._tickets.asObservable();

  private _groupedTickets = new BehaviorSubject<{ [option: string]: Ticket[] }>(
    {}
  );
  groupedTickets$ = this._groupedTickets.asObservable();

  private readonly API_BASE_URL = 'https://sfe-interview.hoppscotch.com/issues';

  constructor(private _http: HttpClient) {}

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

  setTickets(tickets: Ticket[]) {
    this._tickets.next(tickets);
  }

  setGroupedTickets(groupedTickets: { [option: string]: Ticket[] }) {
    this._groupedTickets.next(groupedTickets);
  }
}
