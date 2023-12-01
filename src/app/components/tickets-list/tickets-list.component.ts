import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { Component, ViewChild } from '@angular/core';
import { Ticket } from '../../interfaces/ticket';
import { TicketsService } from '../../services/tickets.service';
import { TicketsListItemComponent } from '../tickets-list-item/tickets-list-item.component';

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
  currentPage = 1;
  isLoading = false;

  constructor(private _service: TicketsService) {}

  ngOnInit() {
    this._loadTickets();
  }

  private _loadTickets() {
    this.isLoading = true;
    this._service.getTicketsByPage(this.currentPage).subscribe({
      next: (data) => {
        if (data) {
          this.tickets = [...this.tickets, ...data];
          this.currentPage++;
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error loading tickets:', error);
        this.isLoading = false;
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