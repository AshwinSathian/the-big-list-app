import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { Priority } from '../../enums/priority.enum';
import { Status } from '../../enums/status.enum';
import { Ticket } from '../../interfaces/ticket';
import { InitialsPipe } from '../../pipes/initials.pipe';
import { StringJoinPipe } from '../../pipes/string-join.pipe';

@Component({
  selector: 'app-tickets-list-item',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    InitialsPipe,
    TooltipModule,
    TagModule,
    StringJoinPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tickets-list-item.component.html',
  styleUrl: './tickets-list-item.component.css',
})
export class TicketsListItemComponent {
  @Input() ticket?: Ticket;
  Status = Status;
  Priority = Priority;
}
