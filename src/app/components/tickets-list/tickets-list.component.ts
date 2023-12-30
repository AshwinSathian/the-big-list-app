import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { Component, ViewChild } from '@angular/core';
import { Ticket } from '../../interfaces/ticket';
import { TicketsService } from '../../services/tickets.service';
import { TicketsListItemComponent } from '../tickets-list-item/tickets-list-item.component';
import { LoaderService } from '../../services/loader.service';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-tickets-list',
  standalone: true,
  imports: [ScrollingModule, TicketsListItemComponent],
  templateUrl: './tickets-list.component.html',
  styleUrl: './tickets-list.component.css',
})
export class TicketsListComponent {
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  tickets: Ticket[] = [];
  groupedTickets: { [option: string]: Ticket[] } = {};
  currentPage = 1;
  keys: string[] = [];

  constructor(
    private _service: TicketsService,
    private _filterService: FilterService,
    private _loaderService: LoaderService
  ) {}

  ngOnInit() {
    this._loadTickets();

    this._service.groupedTickets$.subscribe({
      next: (data) => {
        this.keys = Object.keys(data || {});
        if (this.keys?.length) {
          this.groupedTickets = JSON.parse(JSON.stringify(data));
          this._loaderService.setLoader();
        }
      },
      error: (error) => {
        console.error('Error loading grouped tickets:', error);
        this._loaderService.setLoader();
      },
    });

    this._filterService.selectedFilterOptions$.subscribe({
      next: (data) => {
        if (!data?.length) {
          this.keys = [];
        }
      },
    });
  }

  private _loadTickets() {
    this._loaderService.setLoader(true);
    this._service.getTicketsByPage(this.currentPage).subscribe({
      next: (data) => {
        if (data?.length) {
          this.tickets = [...this.tickets, ...data];
          this.currentPage++;
          this._service.setTickets(this.tickets);
          this._loaderService.setLoader();
        }
      },
      error: (error) => {
        console.error('Error loading tickets:', error);
        this._loaderService.setLoader();
      },
    });
  }

  onScroll(index: number) {
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    if (end === total) {
      this._loadTickets();
    }
  }
}
