import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TicketsListComponent } from './components/tickets-list/tickets-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TicketsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
