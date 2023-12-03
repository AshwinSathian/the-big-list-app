import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TicketsListComponent } from './components/tickets-list/tickets-list.component';
import { FilterComponent } from './components/filter/filter.component';
import { LoaderComponent } from './components/loader/loader.component';
import { GroupedTicketsListComponent } from './components/grouped-tickets-list/grouped-tickets-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TicketsListComponent,
    FilterComponent,
    LoaderComponent,
    GroupedTicketsListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
