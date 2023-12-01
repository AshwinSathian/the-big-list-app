import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { Filter } from '../../enums/filter.enum';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, MenubarModule, ButtonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  items: MenuItem[] = [
    {
      id: Filter.status,
      label: 'Status',
      command: () => this.setFilter(Filter.status),
    },
    {
      id: Filter.labels,
      label: 'Labels',
      command: () => this.setFilter(Filter.labels),
    },
    {
      id: Filter.priority,
      label: 'Priority',
      command: () => this.setFilter(Filter.priority),
    },
    {
      id: Filter.assignee,
      label: 'Assignee',
      command: () => this.setFilter(Filter.assignee),
    },
  ];

  selectedFilter$ = this._service.selectedFilter$;

  constructor(private _service: FilterService) {}

  setFilter(filter: Filter) {
    this._service.setFilter(filter);
  }

  clearFilter() {
    this._service.clearFilter();
  }
}
