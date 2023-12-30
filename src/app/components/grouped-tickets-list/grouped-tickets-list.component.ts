import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { Ticket } from '../../interfaces/ticket';
import { LoaderService } from '../../services/loader.service';
import { TicketsService } from '../../services/tickets.service';
import { TicketsListItemComponent } from '../tickets-list-item/tickets-list-item.component';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-grouped-tickets-list',
  standalone: true,
  imports: [AccordionModule, ScrollingModule, TicketsListItemComponent],
  templateUrl: './grouped-tickets-list.component.html',
  styleUrl: './grouped-tickets-list.component.css',
})
export class GroupedTicketsListComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  keys: string[] = [];
  groupedTickets: { [option: string]: Ticket[] } = {};

  constructor(
    private _service: TicketsService,
    private _filterService: FilterService,
    private _loaderService: LoaderService
  ) {}

  ngOnInit(): void {
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

  onScroll(index: number) {
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
  }
}
