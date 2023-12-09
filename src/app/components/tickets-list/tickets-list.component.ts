import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Ticket } from '../../interfaces/ticket';
import { LoaderService } from '../../services/loader.service';
import { TicketsService } from '../../services/tickets.service';
import { TicketsListItemComponent } from '../tickets-list-item/tickets-list-item.component';

@Component({
  selector: 'app-tickets-list',
  standalone: true,
  imports: [CommonModule, ScrollingModule, TicketsListItemComponent],
  templateUrl: './tickets-list.component.html',
  styleUrl: './tickets-list.component.css',
})
export class TicketsListComponent {
  tickets$ = this._service.tickets$;
  groupedTickets: { [option: string]: Ticket[] } = {};
  currentPage = 1;
  keys: string[] = [];

  constructor(
    private _service: TicketsService,
    private _loaderService: LoaderService
  ) {}

  ngOnInit() {
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
  }
}
