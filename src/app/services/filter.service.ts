import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filter } from '../enums/filter.enum';
import { filterOptionsMap } from '../constants/filter-options-map';
import { Ticket } from '../interfaces/ticket';
import { TicketsService } from './tickets.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private _filterWorker!: Worker;

  private _selectedFilter = new BehaviorSubject<Filter | null>(null);
  selectedFilter$ = this._selectedFilter.asObservable();

  private _selectedFilterOptions = new BehaviorSubject<string[]>([]);
  selectedFilterOptions$ = this._selectedFilterOptions.asObservable();

  tickets: Ticket[] = [];

  constructor(
    private _ticketsService: TicketsService,
    private _loaderService: LoaderService
  ) {
    _ticketsService.tickets$.subscribe((tickets) => {
      if (tickets?.length) this.tickets = tickets;
    });

    if (typeof Worker !== 'undefined') {
      this._filterWorker = new Worker(
        new URL('../../workers/filter.worker', import.meta.url)
      );

      this._filterWorker.onmessage = ({ data }) => {
        _ticketsService.setGroupedTickets(data);
      };
    }
  }

  setFilter(filter: Filter) {
    this._selectedFilter.next(filter);
    this._selectedFilterOptions.next(filterOptionsMap[filter]);

    if (typeof Worker !== 'undefined') {
      this._loaderService.setLoader(true);
      this._filterWorker.postMessage({
        tickets: this.tickets,
        filterKey: filter,
      });
    }
  }

  clearFilter() {
    this._selectedFilter.next(null);
    this._selectedFilterOptions.next([]);
  }
}
