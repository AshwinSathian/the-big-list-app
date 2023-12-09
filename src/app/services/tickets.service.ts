import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { Ticket } from '../interfaces/ticket';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private _ticketsWorker!: Worker;
  private CURRENT_PAGE = 1;

  private _tickets = new BehaviorSubject<Ticket[]>([]);
  tickets$ = this._tickets.asObservable();

  private _groupedTickets = new BehaviorSubject<{ [option: string]: Ticket[] }>(
    {}
  );
  groupedTickets$ = this._groupedTickets.asObservable();

  private readonly API_BASE_URL = 'https://sfe-interview.hoppscotch.com/issues';

  constructor(private _loaderService: LoaderService) {
    if (typeof Worker !== 'undefined') {
      this._ticketsWorker = new Worker(
        new URL('../../workers/tickets.worker', import.meta.url)
      );

      // Show Loader just for first page
      _loaderService.setLoader(true);
      this.loadTickets();

      this._ticketsWorker.onmessage = ({ data }) => {
        this.setTickets(data);
        _loaderService.setLoader();
        this.CURRENT_PAGE += 1;
        this.loadTickets();
      };
    }
  }

  loadTickets() {
    this._ticketsWorker.postMessage({
      nextPage: this.CURRENT_PAGE,
    });
  }

  // getTicketsByPage(page: number): Observable<any[]> {
  //   return this._http
  //     .get<{ tickets: any[] }>(`${this.API_BASE_URL}-${page}.json`)
  //     .pipe(
  //       map((response) => response.tickets),
  //       catchError((error) => {
  //         console.error(`Error fetching data for page ${page}:`, error);
  //         return of([]);
  //       })
  //     );
  // }

  setTickets(tickets: Ticket[]) {
    this._tickets.next(tickets);
  }

  setGroupedTickets(groupedTickets: { [option: string]: Ticket[] }) {
    this._groupedTickets.next(groupedTickets);
  }
}
